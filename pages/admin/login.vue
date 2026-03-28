<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 px-4 py-10 text-white"
  >
    <div class="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
      <div class="w-full rounded-3xl bg-white p-8 text-slate-900 shadow-2xl">
        <div class="text-2xl font-bold">Đăng nhập</div>
        <p class="mt-2 text-sm text-slate-500">
          Nhập thông tin quản trị để tiếp tục.
        </p>
        <p class="mt-2 text-xs text-slate-400">
          Đăng nhập xong bạn có thể đổi mật khẩu trong mục `Đổi MK`.
        </p>

        <form class="mt-8 space-y-5" @submit.prevent="submitLogin">
          <div>
            <label
              for="username"
              class="mb-2 block text-sm font-semibold text-slate-700"
            >
              Tài khoản
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              autocomplete="username"
              class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              placeholder="Nhập tài khoản admin"
            />
          </div>

          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-semibold text-slate-700"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              autocomplete="current-password"
              class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <div
            v-if="errorMessage"
            class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 font-semibold text-white transition hover:from-orange-600 hover:to-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ isSubmitting ? "Đang đăng nhập..." : "Đăng nhập admin" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Đăng nhập Admin",
});

const route = useRoute();

const form = ref({
  username: "admin",
  password: "",
});
const isSubmitting = ref(false);
const errorMessage = ref("");

const submitLogin = async () => {
  try {
    isSubmitting.value = true;
    errorMessage.value = "";

    await $fetch("/api/admin/auth/login", {
      method: "POST",
      body: {
        username: form.value.username,
        password: form.value.password,
      },
    });

    const redirectPath =
      typeof route.query.redirect === "string" && route.query.redirect.startsWith("/admin")
        ? route.query.redirect
        : "/admin/products";

    await navigateTo(redirectPath);
  } catch (error: any) {
    errorMessage.value =
      error?.data?.statusMessage || "Đăng nhập thất bại, vui lòng thử lại";
  } finally {
    isSubmitting.value = false;
  }
};
</script>
