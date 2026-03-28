import db, { type Product } from "~/server/database/db";

export default defineEventHandler(async (event) => {
  const method = event.method;

  if (method === "GET") {
    const stmt = db.prepare("SELECT * FROM product");
    const products = stmt.all() as Product[];

    return {
      success: true,
      data: products,
    };
  }

  if (method === "POST") {
    const body = await readBody(event);

    const insertStmt = db.prepare(`
      INSERT INTO product (name, description, price, discount, care_instructions, images, stock)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertStmt.run(
      body.name ?? "",
      body.description ?? "",
      parseFloat(body.price) || 0,
      parseInt(body.discount) || 0,
      body.care_instructions ?? "",
      body.images ?? "[]",
      parseInt(body.stock) || 0,
    );

    return {
      success: true,
      message: "Thêm sản phẩm thành công",
      id: result.lastInsertRowid,
    };
  }

  if (method === "PUT") {
    const body = await readBody(event);

    if (!body.id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Thiếu id sản phẩm",
      });
    }

    const updateStmt = db.prepare(`
      UPDATE product
      SET name = ?, description = ?, price = ?, discount = ?,
          care_instructions = ?, images = ?, stock = ?
      WHERE id = ?
    `);

    updateStmt.run(
      body.name ?? "",
      body.description ?? "",
      parseFloat(body.price) || 0,
      parseInt(body.discount) || 0,
      body.care_instructions ?? "",
      body.images ?? "[]",
      parseInt(body.stock) || 0,
      body.id,
    );

    return {
      success: true,
      message: "Cập nhật sản phẩm thành công",
    };
  }

  if (method === "DELETE") {
    const body = await readBody(event);

    if (!body.id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Thiếu id sản phẩm",
      });
    }

    const deleteStmt = db.prepare("DELETE FROM product WHERE id = ?");
    deleteStmt.run(body.id);

    return {
      success: true,
      message: "Xóa sản phẩm thành công",
    };
  }

  throw createError({
    statusCode: 405,
    statusMessage: "Phương thức không được phép",
  });
});
