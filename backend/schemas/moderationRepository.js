import pool from "../db.js";

export async function findPending() {
  const [rows] = await pool.query(
    "SELECT * FROM moderation_queue WHERE status = 'pending'"
  );
  return rows;
}

export async function updateStatus(id, status, reason = null) {
  const [result] = await pool.query(
    "UPDATE moderation_queue SET status = ?, reason = ? WHERE id = ?",
    [status, reason, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await pool.query(
    "SELECT * FROM moderation_queue WHERE id = ?",
    [id]
  );

  return rows[0];
}

export async function updateContentStatus(type, contentId, status) {
  const map = {
    review: "reviews",
    question: "questions",
    answer: "answers",
  };

  const table = map[type];

  if (!table) {
    throw new Error("Invalid content type");
  }

  await pool.query(
    `UPDATE ${table} SET status = ? WHERE id = ?`,
    [status, contentId]
  );
}