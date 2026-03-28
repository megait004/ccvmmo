<template>
  <div class="mx-auto max-w-3xl space-y-6">
    <div
      class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8"
    >
      <div class="text-2xl font-bold text-gray-900">Đổi mật khẩu admin</div>
      <p class="mt-2 text-sm text-gray-500">
        Tài khoản hiện tại:
        <span class="font-semibold text-gray-700">{{ adminUsername }}</span>
      </p>
      <p class="mt-1 text-sm text-gray-500">
        Mật khẩu mới cần có ít nhất 6 ký tự.
      </p>
    </div>

    <div
      class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8"
    >
      <form class="space-y-5" @submit.prevent="submitChangePassword">
        <div>
          <label
            for="current-password"
            class="mb-2 block text-sm font-semibold text-gray-700"
          >
            Mật khẩu hiện tại
          </label>
          <input
            id="current-password"
            v-model="form.currentPassword"
            type="password"
            autocomplete="current-password"
            class="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            placeholder="Nhập mật khẩu hiện tại"
          />
        </div>

        <div>
          <label
            for="new-password"
            class="mb-2 block text-sm font-semibold text-gray-700"
          >
            Mật khẩu mới
          </label>
          <input
            id="new-password"
            v-model="form.newPassword"
            type="password"
            autocomplete="new-password"
            class="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            placeholder="Nhập mật khẩu mới"
          />
        </div>

        <div>
          <label
            for="confirm-password"
            class="mb-2 block text-sm font-semibold text-gray-700"
          >
            Xác nhận mật khẩu mới
          </label>
          <input
            id="confirm-password"
            v-model="form.confirmPassword"
            type="password"
            autocomplete="new-password"
            class="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            placeholder="Nhập lại mật khẩu mới"
          />
        </div>

        <div
          v-if="feedback.message"
          class="rounded-2xl px-4 py-3 text-sm"
          :class="feedbackClass"
        >
          {{ feedback.message }}
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 font-semibold text-white transition hover:from-orange-600 hover:to-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ isSubmitting ? "Đang cập nhật..." : "Cập nhật mật khẩu" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

useHead({
  title: "Đổi MK - Admin",
});

const adminUsername = ref("admin");
const isSubmitting = ref(false);
const feedback = ref<{
  type: "success" | "error";
  message: string;
}>({
  type: "success",
  message: "",
});
const feedbackClass = computed(() => {
  if (feedback.value.type === "success") {
    return "border border-green-200 bg-green-50 text-green-700";
  }

  return "border border-red-200 bg-red-50 text-red-600";
});
const form = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const loadAdminProfile = async () => {
  try {
    const response = await $fetch<{
      authenticated: boolean;
      user: {
        username: string;
      };
    }>("/api/admin/auth/me");

    adminUsername.value = response.user.username;
  } catch {}
};

const resetForm = () => {
  form.value = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
};

const submitChangePassword = async () => {
  try {
    isSubmitting.value = true;
    feedback.value = {
      type: "success",
      message: "",
    };

    const response = await $fetch<{
      success: boolean;
      message: string;
    }>("/api/admin/auth/change-password", {
      method: "POST",
      body: {
        currentPassword: form.value.currentPassword,
        newPassword: form.value.newPassword,
        confirmPassword: form.value.confirmPassword,
      },
    });

    feedback.value = {
      type: "success",
      message: response.message,
    };
    resetForm();
  } catch (error: any) {
    feedback.value = {
      type: "error",
      message: error?.data?.statusMessage || "Không thể đổi mật khẩu",
    };
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  loadAdminProfile();
});
</script>
