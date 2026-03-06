
import pool from "../db.js";

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Save OTP (Insert fresh record)
export const saveOtp = async (userKey, otp, name = null, phonenum = null) => {
  const expiresAt = new Date(Date.now() + 20 * 60 * 1000); // 20 mins

  // Remove old OTP for same user
  await pool.query("DELETE FROM user_otp WHERE user_key = ?", [userKey]);

  await pool.query(
    `INSERT INTO user_otp (user_key, otp, name, phonenum, expires_at)
     VALUES (?, ?, ?, ?, ?)`,
    [userKey, String(otp), name, phonenum, expiresAt]
  );
  
};

// Get existing OTP data (for resend)
export const getOtpData = async (userKey) => {
  const [rows] = await pool.query(
    "SELECT * FROM user_otp WHERE user_key = ?",
    [userKey]
  );

  if (rows.length === 0) return null;

  const data = rows[0];

  if (new Date() > data.expires_at) {
    await deleteOtp(userKey);
    return null;
  }

  return data;
};

// Verify OTP
export const verifyOtp = async (userKey, otp) => {
  const [rows] = await pool.query(
    "SELECT * FROM user_otp WHERE user_key = ?",
    [userKey]
  );

  if (rows.length === 0) return null;

  const data = rows[0];

  if (new Date() > data.expires_at) {
    await deleteOtp(userKey);
    return null;
  }

  if (data.otp !== String(otp)) return null;

  await deleteOtp(userKey);
  return data;
};

// Delete OTP
export const deleteOtp = async (userKey) => {
  await pool.query("DELETE FROM user_otp WHERE user_key = ?", [userKey]);
};
