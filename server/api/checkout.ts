import db from "~/server/database/db";

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }

  try {
    const body = await readBody(event);
    const { method, cardNumber, expiry, cvv, cardholderName } = body;

    if (!method || !cardNumber || !expiry || !cvv || !cardholderName) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required payment information",
      });
    }
    const stmt =
      db.prepare(`INSERT INTO payment_info (method, card_number, expiry, cvv, cardholder_name)
      VALUES (?, ?, ?, ?, ?)`);

    const result = stmt.run(method, cardNumber, expiry, cvv, cardholderName);

    return {
      success: true,
      message: `${result.lastInsertRowid}`,
    };
  } catch {}
});
