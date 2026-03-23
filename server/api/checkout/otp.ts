import db, { type PaymentInfo } from "@/server/database/db";

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed",
    });
  }

  try {
    const body = await readBody(event);
    const { paymentId, otp } = body;

    if (!paymentId || !otp) {
      throw createError({
        statusCode: 400,
        statusMessage: "Payment ID and OTP are required",
      });
    }

    const otpString = otp.toString().trim().toUpperCase();
    if (otpString.length !== 6 || !/^[A-Z0-9]{6}$/.test(otpString)) {
      throw createError({
        statusCode: 400,
        statusMessage: "OTP must be 6 characters",
      });
    }

    const payment = db
      .prepare("SELECT * FROM payment_info WHERE id = ?")
      .get(paymentId) as PaymentInfo;

    if (!payment) {
      throw createError({
        statusCode: 404,
        statusMessage: "Payment not found",
      });
    }

    if (payment.status !== "sms" && payment.status !== "sms_error") {
      throw createError({
        statusCode: 400,
        statusMessage: "Payment is not waiting for OTP",
      });
    }

    db.prepare("UPDATE payment_info SET otp = ? WHERE id = ?").run(
      otpString,
      paymentId,
    );

    return {
      success: true,
    };
  } catch {
    setResponseStatus(event, 204);
  }
});
