import db, {
  type Product,
  type ProductVariant,
  type ProductWithVariants,
} from "~/server/database/db";

interface ProductPayload {
  id?: number | string;
  name?: string;
  description?: string;
  price?: number | string;
  discount?: number | string;
  care_instructions?: string;
  images?: string;
  stock?: number | string;
  variants?: VariantPayload[];
}

interface VariantPayload {
  color_code?: string;
  color_name?: string;
  image?: string;
  price?: number | string;
  stock?: number | string;
  is_active?: boolean | number;
  is_default?: boolean | number;
}

interface NormalizedVariant {
  color_code: string;
  color_name: string;
  image: string;
  price: number;
  stock: number;
  is_active: number;
  is_default: number;
  display_order: number;
}

const parseFloatValue = (value: unknown) => {
  if (typeof value !== "number" && typeof value !== "string") {
    return 0;
  }

  const parsedValue = Number.parseFloat(String(value));
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const parseIntegerValue = (value: unknown) => {
  if (typeof value !== "number" && typeof value !== "string") {
    return 0;
  }

  const parsedValue = Number.parseInt(String(value), 10);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const normalizeColorCode = (value: unknown) => {
  if (typeof value !== "string") {
    return "#D1D5DB";
  }

  const trimmedValue = value.trim();
  if (trimmedValue === "") {
    return "#D1D5DB";
  }

  const prefixedValue = trimmedValue.startsWith("#") ? trimmedValue : `#${trimmedValue}`;
  return prefixedValue.toUpperCase();
};

const parseImages = (images: unknown) => {
  if (typeof images !== "string" || images.trim() === "") {
    return "[]";
  }

  try {
    const parsedImages = JSON.parse(images);
    if (!Array.isArray(parsedImages)) {
      return "[]";
    }

    const normalizedImages = parsedImages.filter(
      (image): image is string => typeof image === "string" && image.trim() !== "",
    );

    return JSON.stringify(normalizedImages);
  } catch {
    return "[]";
  }
};

const getImagesArray = (images: string) => {
  try {
    const parsedImages = JSON.parse(images || "[]");
    return Array.isArray(parsedImages)
      ? parsedImages.filter(
          (image): image is string => typeof image === "string" && image.trim() !== "",
        )
      : [];
  } catch {
    return [];
  }
};

const buildFallbackVariant = (product: Pick<Product, "price" | "stock" | "images">) => ({
  color_code: "#D1D5DB",
  color_name: "Default",
  image: getImagesArray(product.images)[0] || "",
  price: Number(product.price) || 0,
  stock: Number(product.stock) || 0,
  is_active: 1,
  is_default: 1,
  display_order: 0,
});

const normalizeVariants = (
  variants: VariantPayload[] | undefined,
  fallbackProduct: Pick<Product, "price" | "stock" | "images">,
) => {
  const fallbackVariant = buildFallbackVariant(fallbackProduct);

  if (!Array.isArray(variants) || variants.length === 0) {
    return [fallbackVariant];
  }

  const normalizedVariants: NormalizedVariant[] = variants.map((variant, index) => ({
    color_code: normalizeColorCode(variant.color_code ?? fallbackVariant.color_code),
    color_name:
      typeof variant.color_name === "string" && variant.color_name.trim() !== ""
        ? variant.color_name.trim()
        : `Color ${index + 1}`,
    image:
      typeof variant.image === "string" && variant.image.trim() !== ""
        ? variant.image.trim()
        : fallbackVariant.image,
    price: parseFloatValue(variant.price ?? fallbackVariant.price),
    stock: parseIntegerValue(variant.stock ?? fallbackVariant.stock),
    is_active: variant.is_active === false || Number(variant.is_active) === 0 ? 0 : 1,
    is_default: variant.is_default === true || Number(variant.is_default) === 1 ? 1 : 0,
    display_order: index,
  }));

  const colorCodeSet = new Set<string>();
  for (const variant of normalizedVariants) {
    if (colorCodeSet.has(variant.color_code)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Mã màu ${variant.color_code} bị trùng. Mỗi variant phải có màu riêng.`,
      });
    }
    colorCodeSet.add(variant.color_code);
  }

  const activeVariantIndexes = normalizedVariants.reduce((indexes, variant, index) => {
    if (variant.is_active === 1) {
      indexes.push(index);
    }
    return indexes;
  }, [] as number[]);

  if (activeVariantIndexes.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cần ít nhất 1 variant đang hiển thị.",
    });
  }

  const currentDefaultIndex = normalizedVariants.findIndex(
    (variant) => variant.is_default === 1,
  );
  const safeDefaultIndex = activeVariantIndexes.includes(currentDefaultIndex)
    ? currentDefaultIndex
    : activeVariantIndexes[0];

  return normalizedVariants.map((variant, index) => ({
    ...variant,
    is_default: index === safeDefaultIndex ? 1 : 0,
  }));
};

const getDefaultVariant = (variants: ProductVariant[]) => {
  return (
    variants.find((variant) => Number(variant.is_default) === 1) ??
    variants.find((variant) => Number(variant.is_active) === 1) ??
    variants[0] ??
    null
  );
};

const mapProductsWithVariants = (
  products: Product[],
  variants: ProductVariant[],
): ProductWithVariants[] => {
  const variantsByProductId = new Map<number, ProductVariant[]>();

  for (const variant of variants) {
    const existingVariants = variantsByProductId.get(variant.product_id) ?? [];
    existingVariants.push(variant);
    variantsByProductId.set(variant.product_id, existingVariants);
  }

  return products.map((product) => {
    const productVariants = variantsByProductId.get(product.id) ?? [];
    const safeVariants =
      productVariants.length > 0
        ? productVariants
        : [
            {
              id: 0,
              product_id: product.id,
              ...buildFallbackVariant(product),
            },
          ];
    const defaultVariant = getDefaultVariant(safeVariants);
    const variantImages = safeVariants
      .map((variant) => variant.image)
      .filter((image, index, allImages) => image && allImages.indexOf(image) === index);
    const totalStock = safeVariants.reduce(
      (sum, variant) => sum + (Number(variant.stock) || 0),
      0,
    );

    return {
      ...product,
      price: defaultVariant?.price ?? product.price,
      stock: totalStock > 0 ? totalStock : product.stock,
      images: JSON.stringify(
        variantImages.length > 0 ? variantImages : getImagesArray(product.images),
      ),
      variants: safeVariants,
    };
  });
};

const insertVariantStmt = db.prepare(`
  INSERT INTO product_variant (
    product_id,
    color_code,
    color_name,
    image,
    price,
    stock,
    is_active,
    is_default,
    display_order
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const replaceProductVariants = (
  productId: number,
  variants: ReturnType<typeof normalizeVariants>,
) => {
  db.prepare("DELETE FROM product_variant WHERE product_id = ?").run(productId);

  for (const variant of variants) {
    insertVariantStmt.run(
      productId,
      variant.color_code,
      variant.color_name,
      variant.image,
      variant.price,
      variant.stock,
      variant.is_active,
      variant.is_default,
      variant.display_order,
    );
  }
};

const getProductVariantCount = (productId: number) => {
  const result = db
    .prepare("SELECT COUNT(*) as count FROM product_variant WHERE product_id = ?")
    .get(productId) as { count: number };

  return Number(result.count) || 0;
};

export default defineEventHandler(async (event) => {
  const method = event.method;

  if (method === "GET") {
    const products = db
      .prepare("SELECT * FROM product ORDER BY id DESC")
      .all() as Product[];
    const variants = db
      .prepare(
        `
          SELECT *
          FROM product_variant
          ORDER BY product_id ASC, display_order ASC, id ASC
        `,
      )
      .all() as ProductVariant[];

    return {
      success: true,
      data: mapProductsWithVariants(products, variants),
    };
  }

  if (method === "POST") {
    const body = await readBody<ProductPayload>(event);
    const normalizedImages = parseImages(body.images);
    const normalizedPrice = parseFloatValue(body.price);
    const normalizedStock = parseIntegerValue(body.stock);

    const insertStmt = db.prepare(`
      INSERT INTO product (name, description, price, discount, care_instructions, images, stock)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertStmt.run(
      body.name ?? "",
      body.description ?? "",
      normalizedPrice,
      parseIntegerValue(body.discount),
      body.care_instructions ?? "",
      normalizedImages,
      normalizedStock,
    );
    const productId = Number(result.lastInsertRowid);
    const normalizedVariants = normalizeVariants(body.variants, {
      price: normalizedPrice,
      stock: normalizedStock,
      images: normalizedImages,
    });

    replaceProductVariants(productId, normalizedVariants);

    return {
      success: true,
      message: "Thêm sản phẩm thành công",
      id: productId,
    };
  }

  if (method === "PUT") {
    const body = await readBody<ProductPayload>(event);

    if (!body.id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Thiếu id sản phẩm",
      });
    }

    const productId = parseIntegerValue(body.id);
    const normalizedImages = parseImages(body.images);
    const normalizedPrice = parseFloatValue(body.price);
    const normalizedStock = parseIntegerValue(body.stock);

    const updateStmt = db.prepare(`
      UPDATE product
      SET name = ?, description = ?, price = ?, discount = ?,
          care_instructions = ?, images = ?, stock = ?
      WHERE id = ?
    `);

    updateStmt.run(
      body.name ?? "",
      body.description ?? "",
      normalizedPrice,
      parseIntegerValue(body.discount),
      body.care_instructions ?? "",
      normalizedImages,
      normalizedStock,
      productId,
    );

    if (Array.isArray(body.variants)) {
      const normalizedVariants = normalizeVariants(body.variants, {
        price: normalizedPrice,
        stock: normalizedStock,
        images: normalizedImages,
      });

      replaceProductVariants(productId, normalizedVariants);
    } else if (getProductVariantCount(productId) === 0) {
      replaceProductVariants(
        productId,
        normalizeVariants(undefined, {
          price: normalizedPrice,
          stock: normalizedStock,
          images: normalizedImages,
        }),
      );
    }

    return {
      success: true,
      message: "Cập nhật sản phẩm thành công",
    };
  }

  if (method === "DELETE") {
    const body = await readBody<{ id?: number | string }>(event);

    if (!body.id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Thiếu id sản phẩm",
      });
    }

    db.prepare("DELETE FROM product_variant WHERE product_id = ?").run(body.id);
    db.prepare("DELETE FROM product WHERE id = ?").run(body.id);

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
