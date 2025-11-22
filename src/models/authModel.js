import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redis } from "../config/redis.js";
import { mapAgentRow } from "../utils/Mapping/mapAgent.js";

dotenv.config();
export const loginService = async (username, plainPassword) => {
  const query = `
    SELECT *
    FROM agents
    WHERE username = $1
    LIMIT 1
  `;
  const result = await pool.query(query, [username]);
  const data = result.rows[0];
  if (!data) return null;
  const agent = mapAgentRow(data);
  const match = await bcrypt.compare(plainPassword, agent.password);
  if (!match) return null;
  const accessToken = jwt.sign(
    {
      agentId: agent.agentId,
      role: agent.role,
      username: agent.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
  );
  const refreshToken = jwt.sign(
    {
      agentId: agent.agentId,
      role: agent.role,
      username: agent.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
  );
  await storeRefreshToken(username, refreshToken);
  return {
    agentId: agent.agentId,
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

export const agentExistsService = async (agentId, username) => {
  const query = `SELECT 1
    FROM agents
    WHERE agent_id = $1
      OR username = $2
    LIMIT 1;`;
  const result = await pool.query(query, [agentId, username]);
  const agentExists = result.rows.length > 0;
  return agentExists;
};

export const createAgentService = async (agentData) => {};
