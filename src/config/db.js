import pg from "pg";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;

let sslConfig;
if (process.env.NODE_ENV === "production") {
  sslConfig = {
    rejectUnauthorized: true,
    ca: process.env.CA,
  };
  console.log("Using ca directly");
} else {
  sslConfig = {
    rejectUnauthorized: true,
    ca: fs.readFileSync(process.env.CA).toString(),
  };
}

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  database: process.env.DATABASE,
  ssl: sslConfig,
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL with SSL"))
  .catch((err) => console.error("Error connecting to PostgreSQL:", err));

export default pool;
