import { createError } from "h3";
import {
  authenticateAdmin,
  createAdminSession,
  ensureAdminAccount,
} from "@/server/utils/admin-auth";

export default defineEventHandler(async (event) => {
  await ensureAdminAccount();

  const body = await readBody<{
    username?: string;
    password?: string;
  }>(event);

  const username = body.username?.trim() || "";
  const password = body.password || "";

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Vui lòng nhập tài khoản và mật khẩu",
    });
  }

  const admin = await authenticateAdmin(username, password);

  if (!admin) {
    throw createError({
      statusCode: 401,
      statusMessage: "Tài khoản hoặc mật khẩu không đúng",
    });
  }

  createAdminSession(event, admin.username);

  return {
    success: true,
    user: {
      username: admin.username,
    },
  };
});
