import pool from "../db.js";
//import bcrypt from "bcrypt";

//-------------------------------- GET USER PROFILE -----------------------

 const getProfile = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT user_id, username, email, phonenumber FROM user_table WHERE id = ?",
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//---------------------------UPDATE PROFILE ----------------------------------
 const updateProfile = async (req, res) => {
  const { name,email, phone } = req.body;

  try {
    await pool.query(
      "UPDATE user_table SET (username,email,phonenumber) VALUES (?,?,?) WHERE user_id = ?",
      [name,email,phone, req.user.id]
    );

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

//-------------DELETE ACCOUNT -----------------------------------------------

 const deleteAccount = async (req, res) => {
  try {
    await pool.query("DELETE FROM user_table WHERE user_id = ?", [req.user.id]);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export {
    getProfile, updateProfile,deleteAccount
}