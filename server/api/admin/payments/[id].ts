import db, { type PaymentInfo } from "~/server/database/db";

export default defineEventHandler(async (event) => {
  const method = event.method;
  const paymentId = getRouterParam(event, "id");

  if (!paymentId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Payment ID is required",
    });
  }

  if (method === "GET") {
    try {
      const stmt = db.prepare("SELECT * FROM payment_info WHERE id = ?");
      const payment = stmt.get(paymentId) as PaymentInfo;

      if (!payment) {
        throw createError({
          statusCode: 404,
          statusMessage: "Payment not found",
        });
      }

      return payment;
    } catch {}
  }

  if (method === "DELETE") {
    try {
      const checkStmt = db.prepare("SELECT id FROM payment_info WHERE id = ?");
      const existingPayment = checkStmt.get(paymentId);

      if (!existingPayment) {
        throw createError({
          statusCode: 404,
          statusMessage: "Payment not found",
        });
      }

      const deleteStmt = db.prepare("DELETE FROM payment_info WHERE id = ?");
      deleteStmt.run(paymentId);

      return { success: true, message: "Payment deleted successfully" };
    } catch {}
  }

  if (method === "PUT") {
    try {
      const body = await readBody(event);
      const {
        method: paymentMethod,
        card_number,
        expiry,
        cvv,
        cardholder_name,
        otp,
        status,
      } = body;

      const checkStmt = db.prepare("SELECT id FROM payment_info WHERE id = ?");
      const existingPayment = checkStmt.get(paymentId);

      if (!existingPayment) {
        throw createError({
          statusCode: 404,
          statusMessage: "Payment not found",
        });
      }

      const updateStmt = db.prepare(`
        UPDATE payment_info
        SET method = ?, card_number = ?, expiry = ?, cvv = ?, cardholder_name = ?, otp = ?, status = ?
        WHERE id = ?
      `);

      updateStmt.run(
        paymentMethod,
        card_number,
        expiry,
        cvv,
        cardholder_name,
        otp,
        status,
        paymentId,
      );

      const updatedPayment = db
        .prepare("SELECT * FROM payment_info WHERE id = ?")
        .get(paymentId) as PaymentInfo;

      return updatedPayment;
    } catch {}
  }

  throw createError({
    statusCode: 405,
    statusMessage: "Method not allowed",
  });
});
