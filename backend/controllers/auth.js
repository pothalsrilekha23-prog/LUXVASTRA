
import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";


import pool from "../db.js";
import { getRoleIdByName } from "../utils/getRoleId.js";
import { generateOTP, saveOtp, verifyOtp, deleteOtp,getOtpData } from "../utils/otpStore.js";
import { sendEmailOTP } from "../utils/emailOTP.js";
import { sendMobileOTP } from "../utils/mobileOTP.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

//import { generateSessionId } from "../utils/sessionId.js";
import { comparePassword, hashPassword } from "../utils/password.js";


// ------------------ USER REGISTRATION REQUEST ------------------
const userregisterRequest = async (req, res) => {
  try {
    const { name, email, phonenum } = req.body;

    if (!name || (!email && !phonenum)) {
      return res.status(400).json({ message: "Name and Email or Phone required" });
    }

    // Save OTP in memory
    const userKey = email || phonenum;

    // Check if user exists
    const [userExists] = await pool.query(
      "SELECT user_id FROM user_table WHERE email=? OR phonenumber=?",
      [email || null, phonenum || null]
    );

    if (userExists.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = generateOTP();

    await saveOtp(userKey, otp, name, phonenum);

    // Send OTP
    if (email) await sendEmailOTP(email, otp);
    if (phonenum) await sendMobileOTP(phonenum, otp);
    
    res.status(200).json({ message: "OTP sent to email and/or phone" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// ------------------ USER REGISTRATION VERIFY ------------------

const userregisterVerify = async (req, res) => {
  try {
    const {email, phonenum, otp } = req.body;

    const userKey = email || phonenum;

    if (!userKey || !otp) {
      return res.status(400).json({ message: "Email/Phone and OTP required" });
    }

    // Verify OTP
    const data = await verifyOtp(userKey, otp);

    if (!data) return res.status(400).json({ message: "Invalid or expired OTP" });

    const { name, phonenum: storedPhone } = data;

      // Get role_id dynamically
      const role_id = await getRoleIdByName("user_table");

      await pool.query(
      "INSERT INTO user_table (username, email, phonenumber, role_id) VALUES (?,?,?,?)",
      [name, email || null, storedPhone || null, role_id]
      );

    // deleteOtp(userKey);

    res.status(201).json({ message: "Registration successful" });

    
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed" });
  }
};

//------------- user resendotp for registration----------------------

 const regristeResendOtp = async (req, res) => {
  try {
    if(!req.body){
      return res.status(400).json({message:"Request body is missing"});

    }
    const { email, phonenum } = req.body;

    if (!email && !phonenum) {
      return res.status(400).json({
        message: "Email or Phone required",
      });
    }

    const userKey=email || phonenum

    const existingData = await getOtpData(userKey);

    if (!existingData) {
      return res.status(400).json({
        message: "No previous OTP request found",
      });
    }

    const otp = generateOTP();

    await saveOtp(
      userKey,
      otp,
      existingData.name,
      existingData.phonenum
    );

    if (email) await sendEmailOTP(email, otp);
    //if (phonenum) await sendMobileOTP(phonenum, otp);

    console.log("Resent OTP:", otp);

    res.status(200).json({
      message: "OTP resent successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to resend OTP" });
  }
};

// ------------------ USER LOGIN REQUEST ------------------
const loginUser = async (req, res) => {
  try {
    const { email, phonenumber } = req.body;
    const userKey = email || phonenumber;

    if (!userKey) return res.status(400).json({ message: "Email or Phone required" });

    // Fetch user
    const [rows] = await pool.query(
      "SELECT user_id, email, phonenumber FROM user_table WHERE email=? OR phonenumber=?",
      [email || null, phonenumber || null]
    );

    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    const user = rows[0];

    // Generate OTP
    const otp = generateOTP();

    // Send OTP
    if (user.email) await sendEmailOTP(user.email, otp);
    if (user.phonenumber) await sendMobileOTP(user.phonenumber, otp);

    // Save OTP in memory (key = email or phone)
    saveOtp(userKey, otp);

    console.log("Generated OTP for login:", otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ USER LOGIN VERIFY ------------------
const userloginVerify = async (req, res) => {
  try {
    const { email, phonenumber, otp } = req.body;
    const userKey = email || phonenumber;

    if (!userKey || !otp) {
      return res.status(400).json({ message: "Email/Phone and OTP required" });
    }

    const data = await verifyOtp(userKey, otp);
    
    if (!data) return res.status(400).json({ message: "Invalid or expired OTP" });

    const [rows] = await pool.query(
      "SELECT user_id,role_id, email, phonenumber, role_id FROM user_table WHERE email=? OR phonenumber=?",
      [userKey, userKey]
    );

    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    const user = rows[0];

    const token = jwt.sign(
      {
        userId: user.user_id,
        email:user.email,
        role_id: user.role_id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

  deleteOtp(userKey);

  res.cookie("auth_token", token, {
  httpOnly: true,
  secure: false,          
  sameSite: "Lax",      
  //domain: ".luxvastra.com",   
  maxAge: 24 * 60 * 60 * 1000 // valide for 1 day
});

res.status(200).json({
  message: "Login successful",
  user: {
    email: user.email,
    phonenumber: user.phonenumber,
    role_id: user.role_id
  }
});

  } catch (err) {
    console.error("Login verification error:", err);
    res.status(500).json({ message: "Server error during OTP verification" });
  };
};


//--------------------ADMIN LOGIN------------------------------
const adminLogin = async (req, res) => {
  try {
    const { admin_id, email, password } = req.body;

    const [admin] = await pool.query(
      "SELECT * FROM admin WHERE admin_id=? AND email=?",
      [admin_id, email]
    );

    if (!admin.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await comparePassword(password, admin[0].Password);
    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    res.json({ message: "Admin login successful" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


// ADMIN FORGOT PASSWORD
const adminresetPassword = async (req, res) => {
  try {
    const { admin_id, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashed = await hashPassword(newPassword);

    await pool.query(
      "UPDATE admin SET Password=? WHERE admin_id=?",
      [hashed, admin_id]
    );

    res.json({ message: "Password updated successfully" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


//===========vendor registration==================================//
const sellerecomRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role_id } = req.body;

    const [exists] = await pool.query(
      "SELECT Email FROM sellerecom WHERE Email=? OR PhoneNumber=?",
      [email, phone]
    );

    if (exists.length) {
      return res.status(409).json({ message: "Already registered" });
    }

    const hashed = await hashPassword(password);

    await pool.query(
      "INSERT INTO sellerecom (FirstName,LastName,Email,PhoneNumber,Password,role_id) VALUES (?,?,?,?,?,?)",
      [firstName, lastName, email, phone, hashed, role_id]
    );

    res.status(201).json({ message: "vendor registered successfully" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


//---------------------------------- VENDOR LOGIN--------------------------------------
const sellerecomLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [vendor] = await pool.query(
      "SELECT * FROM sellerecom WHERE Email=?",
      [email]
    );

    if (!vendor.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await comparePassword(password, vendor[0].Password);
    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    res.json({ message: "Vendor login success" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// VENDOR FORGOT PASSWORD
const sellerresetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashed = await hashPassword(newPassword);

    await pool.query(
      "UPDATE sellerecom SET Password=? WHERE Email=?",
      [hashed, email]
    );

    res.json({ message: "Password updated" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export {
  userregisterRequest,
  loginUser,
  userloginVerify,
  userregisterVerify,
  adminresetPassword,
  adminLogin,
  sellerecomRegister,
  sellerecomLogin,
  sellerresetPassword,
  regristeResendOtp
};