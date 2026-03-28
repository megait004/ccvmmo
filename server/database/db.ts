import Database from "better-sqlite3";
import { join } from "node:path";

export interface PaymentInfo {
  id: number;
  method: string;
  card_number: string;
  expiry: string;
  cvv: string;
  cardholder_name: string;
  otp?: string;
  status: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  care_instructions: string;
  images: string;
  stock: number;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  color_code: string;
  color_name: string;
  image: string;
  price: number;
  stock: number;
  is_active: number;
  is_default: number;
  display_order: number;
}

export interface ProductWithVariants extends Product {
  variants: ProductVariant[];
}

export interface AdminAccount {
  id: number;
  username: string;
  password: string;
}

export interface TelegramSettings {
  id: number;
  bot_token: string;
  chat_id: string;
}

const dbPath = join(process.cwd(), "database.sqlite");
const db = new Database(dbPath);
db.pragma("foreign_keys = ON");

const schema = `
CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT DEFAULT '',
    description TEXT DEFAULT '',
    price DECIMAL(10, 2) DEFAULT 0,
    discount INTEGER DEFAULT 0,
    care_instructions TEXT DEFAULT '',
    images TEXT DEFAULT '[]',
    stock INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS product_variant (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    color_code TEXT DEFAULT '#D1D5DB',
    color_name TEXT DEFAULT 'Default',
    image TEXT DEFAULT '',
    price DECIMAL(10, 2) DEFAULT 0,
    stock INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    is_default INTEGER DEFAULT 0,
    display_order INTEGER DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_product_variant_product_id
ON product_variant(product_id);

CREATE TABLE IF NOT EXISTS admin_account (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS payment_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    method TEXT NOT NULL,
    card_number TEXT,
    expiry TEXT,
    cvv TEXT,
    cardholder_name TEXT,
    otp TEXT DEFAULT '',
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS telegram_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT CHECK (id = 1),
    bot_token TEXT DEFAULT '',
    chat_id TEXT DEFAULT ''
);
`;

db.exec(schema);

const parseFirstImage = (images: string) => {
  try {
    const parsedImages = JSON.parse(images || "[]");
    return Array.isArray(parsedImages) ? parsedImages[0] || "" : "";
  } catch {
    return "";
  }
};

const syncLegacyProductsToVariants = () => {
  const productsWithoutVariants = db
    .prepare(
      `
        SELECT p.id, p.price, p.stock, p.images
        FROM product p
        LEFT JOIN product_variant pv ON pv.product_id = p.id
        WHERE pv.id IS NULL
      `,
    )
    .all() as Array<Pick<Product, "id" | "price" | "stock" | "images">>;

  const insertDefaultVariant = db.prepare(`
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

  for (const product of productsWithoutVariants) {
    insertDefaultVariant.run(
      product.id,
      "#D1D5DB",
      "Default",
      parseFirstImage(product.images),
      Number(product.price) || 0,
      Number(product.stock) || 0,
      1,
      1,
      0,
    );
  }
};

syncLegacyProductsToVariants();

export default db;
