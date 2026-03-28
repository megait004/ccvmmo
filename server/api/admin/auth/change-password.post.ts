import { createError } from "h3";
import {
  createAdminSession,
  requireAdminSession,
  updateAdminPassword,
  verifyCurrentAdminPassword,
} from "@/server/utils/admin-auth";

export default defineEventHandler(async (event) => {
  const admin = await requireAdminSession(event);
  const body = await readBody<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>(event);

  const currentPassword = body.currentPassword || "";
  const newPassword = body.newPassword || "";
  const confirmPassword = body.confirmPassword || "";

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Vui lòng nhập đầy đủ thông tin",
    });
  }

  if (newPassword.length < 6) {
    throw createError({
      statusCode: 400,
      statusMessage: "Mật khẩu mới phải có ít nhất 6 ký tự",
    });
  }

  if (newPassword !== confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Mật khẩu xác nhận không khớp",
    });
  }

  const isCurrentPasswordValid = await verifyCurrentAdminPassword(
    admin,
    currentPassword,
  );

  if (!isCurrentPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Mật khẩu hiện tại không đúng",
    });
  }

  if (currentPassword === newPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Mật khẩu mới phải khác mật khẩu hiện tại",
    });
  }

  await updateAdminPassword(admin.id, newPassword);
  createAdminSession(event, admin.username);

  return {
    success: true,
    message: "Đổi mật khẩu thành công",
  };
});
