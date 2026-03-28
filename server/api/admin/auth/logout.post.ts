import { clearAdminSession } from "@/server/utils/admin-auth";

export default defineEventHandler(async (event) => {
  clearAdminSession(event);

  return {
    success: true,
  };
});
