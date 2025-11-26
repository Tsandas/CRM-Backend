import pool from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

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
