export const mapAgentRow = (row) => {
  if (!row) return null;
  return {
    agentId: row.agent_id,
    firstName: row.first_name,
    lastName: row.last_name,
    username: row.username,
    password: row.password,
    role: row.role,
    active: row.active,
    lastLogin: row.last_login,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};
