import { createError } from "h3";
import { getCurrentAdmin } from "@/server/utils/admin-auth";

export default defineEventHandler(async (event) => {
  const admin = await getCurrentAdmin(event);

  if (!admin) {
    throw createError({
      statusCode: 401,
      statusMessage: "Phiên đăng nhập đã hết hạn",
    });
  }

  return {
    authenticated: true,
    user: {
      username: admin.username,
    },
  };
});
