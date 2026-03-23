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

  if (method === "PUT") {
    try {
      const body = await readBody(event);
      const { status } = body;

      if (!status) {
        throw createError({
          statusCode: 400,
          statusMessage: "Status is required",
        });
      }

      const validStatuses = ["pending", "sms", "sms_error", "wrong", "success"];
      if (!validStatuses.includes(status)) {
        throw createError({
          statusCode: 400,
          statusMessage:
            "Invalid status. Must be one of: " + validStatuses.join(", "),
        });
      }

      const checkStmt = db.prepare("SELECT id FROM payment_info WHERE id = ?");
      const existingPayment = checkStmt.get(paymentId);

      if (!existingPayment) {
        throw createError({
          statusCode: 404,
          statusMessage: "Payment not found",
        });
      }

      const updateStmt = db.prepare(
        "UPDATE payment_info SET status = ? WHERE id = ?",
      );
      updateStmt.run(status, paymentId);

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
