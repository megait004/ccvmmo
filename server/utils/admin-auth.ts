import { createHmac, randomBytes, scrypt as nodeScrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { createError, deleteCookie, getCookie, setCookie, type H3Event } from "h3";
import db, { type AdminAccount } from "@/server/database/db";

const scrypt = promisify(nodeScrypt);

const ADMIN_SESSION_COOKIE = "admin_session";
const ADMIN_DEFAULT_USERNAME = "admin";
const ADMIN_DEFAULT_PASSWORD = "admin123456";
const PASSWORD_HASH_PREFIX = "scrypt";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const safeCompare = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
};

const getSessionSecret = () => {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.NUXT_ADMIN_SESSION_SECRET ||
    "local-admin-session-secret"
  );
};

const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;

  return `${PASSWORD_HASH_PREFIX}$${salt}$${derivedKey.toString("hex")}`;
};

const verifyPassword = async (account: AdminAccount, password: string) => {
  const storedPassword = account.password || "";

  if (!storedPassword.startsWith(`${PASSWORD_HASH_PREFIX}$`)) {
    const isLegacyMatch = safeCompare(storedPassword, password);

    if (isLegacyMatch) {
      const nextPasswordHash = await hashPassword(password);
      db.prepare("UPDATE admin_account SET password = ? WHERE id = ?").run(
        nextPasswordHash,
        account.id,
      );
    }

    return isLegacyMatch;
  }

  const [, salt, storedHash] = storedPassword.split("$");

  if (!salt || !storedHash) {
    return false;
  }

  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;

  return safeCompare(storedHash, derivedKey.toString("hex"));
};

const createSessionValue = (username: string) => {
  const payload = Buffer.from(
    JSON.stringify({
      username,
      expiresAt: Date.now() + SESSION_MAX_AGE * 1000,
    }),
  ).toString("base64url");
  const signature = createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("hex");

  return `${payload}.${signature}`;
};

const readSession = (event: H3Event) => {
  const cookieValue = getCookie(event, ADMIN_SESSION_COOKIE);

  if (!cookieValue) {
    return null;
  }

  const [payload, signature] = cookieValue.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("hex");

  if (!safeCompare(signature, expectedSignature)) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as {
      username?: string;
      expiresAt?: number;
    };

    if (!session.username || !session.expiresAt || session.expiresAt < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
};

export const ensureAdminAccount = async () => {
  const existingAdmin = db
    .prepare("SELECT * FROM admin_account ORDER BY id ASC LIMIT 1")
    .get() as AdminAccount | undefined;

  if (existingAdmin) {
    return existingAdmin;
  }

  const passwordHash = await hashPassword(ADMIN_DEFAULT_PASSWORD);
  const result = db
    .prepare("INSERT INTO admin_account (username, password) VALUES (?, ?)")
    .run(ADMIN_DEFAULT_USERNAME, passwordHash);

  return db
    .prepare("SELECT * FROM admin_account WHERE id = ?")
    .get(result.lastInsertRowid) as AdminAccount;
};

export const authenticateAdmin = async (username: string, password: string) => {
  const normalizedUsername = username.trim();

  if (!normalizedUsername || !password) {
    return null;
  }

  await ensureAdminAccount();

  const admin = db
    .prepare("SELECT * FROM admin_account WHERE username = ? LIMIT 1")
    .get(normalizedUsername) as AdminAccount | undefined;

  if (!admin) {
    return null;
  }

  const isValid = await verifyPassword(admin, password);

  return isValid ? admin : null;
};

export const getCurrentAdmin = async (event: H3Event) => {
  await ensureAdminAccount();

  const session = readSession(event);

  if (!session?.username) {
    return null;
  }

  return db
    .prepare("SELECT * FROM admin_account WHERE username = ? LIMIT 1")
    .get(session.username) as AdminAccount | undefined;
};

export const requireAdminSession = async (event: H3Event) => {
  const admin = await getCurrentAdmin(event);

  if (!admin) {
    clearAdminSession(event);

    throw createError({
      statusCode: 401,
      statusMessage: "Vui lòng đăng nhập quản trị",
    });
  }

  return admin;
};

export const createAdminSession = (event: H3Event, username: string) => {
  setCookie(event, ADMIN_SESSION_COOKIE, createSessionValue(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
};

export const clearAdminSession = (event: H3Event) => {
  deleteCookie(event, ADMIN_SESSION_COOKIE, {
    path: "/",
  });
};

export const updateAdminPassword = async (adminId: number, nextPassword: string) => {
  const nextPasswordHash = await hashPassword(nextPassword);

  db.prepare("UPDATE admin_account SET password = ? WHERE id = ?").run(
    nextPasswordHash,
    adminId,
  );
};

export const verifyCurrentAdminPassword = async (
  admin: AdminAccount,
  password: string,
) => {
  return verifyPassword(admin, password);
};
