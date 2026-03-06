import pool from "../db.js";

export const getRoleIdByName = async (roleName) => {
  const [rows] = await pool.query(
    "SELECT id FROM roles WHERE name = ?",
    [roleName]
  );

  if (!rows.length) {
    throw new Error("Role not found");
  }

  return rows[0].id;
};