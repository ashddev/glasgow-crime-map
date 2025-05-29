import path from "path";
import sql from "better-sqlite3";
import type { VercelResponse } from "@vercel/node";

const dbPath = path.join(__dirname, "../public/data/simd_2022.db");
const db = new sql(dbPath, { readonly: true });

export default function handler(response: VercelResponse) {
  try {
    const crimes = db.prepare("SELECT * FROM simd_2022").all();
    response.status(200).json(crimes);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
}
