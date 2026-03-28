export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith("/admin")) {
    return;
  }

  if (to.path === "/admin/login") {
    try {
      await $fetch("/api/admin/auth/me");
      return navigateTo("/admin/products");
    } catch {
      return;
    }
  }

  try {
    await $fetch("/api/admin/auth/me");
  } catch {
    return navigateTo({
      path: "/admin/login",
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
