import pg from "pg";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;
const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  database: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(process.env.CA).toString(),
  },
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL with SSL"))
  .catch((err) => console.error("Error connecting to PostgreSQL:", err));

export default pool;
