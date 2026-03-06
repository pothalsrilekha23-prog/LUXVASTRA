import pool from "../db.js";
/* ---------------- CREATE NOTIFICATION ---------------- */

export const createNotification = async ({
  user_id,
  role,
  type,
  title,
  message,
  reference_id = null
}) => {

  const [result] = await pool.query(
    `INSERT INTO notifications 
     (user_id, role, type, title, message, reference_id) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, role, type, title, message, reference_id]
  );

  return result.insertId;
};


/* ---------------- FETCH USER NOTIFICATIONS ---------------- */

export const getUserNotifications = async (user_id) => {

  const [rows] = await pool.query(
    `SELECT * FROM notifications
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [user_id]
  );

  return rows;
};


/* ---------------- MARK AS READ ---------------- */

export const markNotificationAsRead = async (id) => {

  await pool.query(
    `UPDATE notifications 
     SET is_read = TRUE 
     WHERE id = ?`,
    [id]
  );

  return true;
};


/* ---------------- DELETE NOTIFICATION (Optional) ---------------- */

export const deleteNotification = async (id) => {

  await pool.query(
    `DELETE FROM notifications WHERE id = ?`,
    [id]
  );

  return true;
};