import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redis } from "../config/redis.js";

dotenv.config();
export const loginService = async (username, plainPassword) => {
  const query = `
    SELECT *
    FROM agents 
    WHERE username = $1
    LIMIT 1
  `;
  const result = await pool.query(query, [username]);
  const agent = result.rows[0];
  if (!agent) return null;
  const match = await bcrypt.compare(plainPassword, agent.password);
  if (!match) return null;
  const accessToken = jwt.sign(
    {
      agent_id: agent.agent_id,
      role: agent.role,
      username: agent.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "3m" }
  );
  const refreshToken = jwt.sign(
    {
      agent_id: agent.agent_id,
      role: agent.role,
      username: agent.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  await storeRefreshToken(username, refreshToken);
  return {
    agent_id: agent.agent_id,
    username: agent.username,
    role: agent.role,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};


const storeRefreshToken = async (username, refreshToken) => {
  await redis.set(
    `refresh_token:${username}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );
};