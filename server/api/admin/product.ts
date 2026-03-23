import db, { type Product } from "~/server/database/db";

export default defineEventHandler(async (event) => {
  const method = event.method;

  try {
    if (method === "GET") {
      const stmt = db.prepare("SELECT * FROM product LIMIT 1");
      const product = stmt.get() as Product | undefined;

      return {
        success: true,
        data: product ?? {
          id: null,
          name: "",
          description: "",
          price: 0,
          discount: 0,
          care_instructions: "",
          images: "[]",
          stock: 0,
        },
      };
    }

    if (method === "PUT") {
      const body = await readBody(event);

      const checkStmt = db.prepare("SELECT id FROM product LIMIT 1");
      const existingProduct = checkStmt.get() as
        | Pick<Product, "id">
        | undefined;

      if (existingProduct) {
        const updateStmt = db.prepare(`
          UPDATE product
          SET name = ?, description = ?, price = ?, discount = ?,
              care_instructions = ?, images = ?, stock = ?
          WHERE id = ?
        `);

        updateStmt.run(
          body.name ?? "",
          body.description ?? "",
          parseFloat(body.price) ?? 0,
          parseInt(body.discount) ?? 0,
          body.care_instructions ?? "",
          body.images ?? "[]",
          parseInt(body.stock) ?? 0,
          existingProduct.id,
        );
      } else {
        const insertStmt = db.prepare(`
          INSERT INTO product (name, description, price, discount, care_instructions, images, stock)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        insertStmt.run(
          body.name ?? "",
          body.description ?? "",
          parseFloat(body.price) ?? 0,
          parseInt(body.discount) ?? 0,
          body.care_instructions ?? "",
          body.images ?? "[]",
          parseInt(body.stock) ?? 0,
        );
      }

      return {
        success: true,
        message: "Lưu sản phẩm thành công",
      };
    }

    throw createError({
      statusCode: 405,
      statusMessage: "Phương thức không được phép",
    });
  } catch {}
});
