// //import crypto from  "crypto";

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// verify smtp
transporter.verify((error) => {
  if (error) {
    console.error("SMTP CONNECTION FAILED ", error.message);
  } else {
    console.log("SMTP CONNECTED SUCCESSFULLY ");
  }
});

/**
 * Send Email OTP
 */
export const sendEmailOTP = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"LUXVASTRA" <${process.env.EMAIL_USER}>`, // must match Gmail
      to: email,
      subject: "Your OTP for LUXVASTRA",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
      html: `
        <h2>LUXVASTRA Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for <b>5 minutes</b>.</p>
      `,
    });

    console.log("EMAIL SENT ", info.messageId);
  } catch (error) {
    console.error("EMAIL SEND FAILED ", error.message);
    throw error;
  }
};
