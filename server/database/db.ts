import Database from "better-sqlite3";
import { join } from "path";

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

const schema = `
CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT CHECK (id = 1),
    name TEXT DEFAULT '',
    description TEXT DEFAULT '',
    price DECIMAL(10, 2) DEFAULT 0,
    discount INTEGER DEFAULT 0,
    care_instructions TEXT DEFAULT '',
    images TEXT DEFAULT '[]',
    stock INTEGER DEFAULT 0
);

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

export default db;
