import { Pool } from "pg";
import { gunzip } from "zlib";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, params?: any[]) {
  const res = await pool.query(text, params);
  return res.rows;
}
