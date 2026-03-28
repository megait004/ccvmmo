import { getRequestURL } from "h3";
import { requireAdminSession } from "@/server/utils/admin-auth";

const publicAdminApiPaths = new Set([
  "/api/admin/auth/login",
  "/api/admin/auth/logout",
]);

export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname;

  if (!pathname.startsWith("/api/admin/")) {
    return;
  }

  if (publicAdminApiPaths.has(pathname)) {
    return;
  }

  await requireAdminSession(event);
});
