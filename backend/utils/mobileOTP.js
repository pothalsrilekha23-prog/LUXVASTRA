import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 * send otp via msg91 flow api
 * @param {string} phone - 10 digit mobile number
 * @param {string} otp - generated OTP
 */
export const sendMobileOTP = async (phone, otp) => {
  try {
    const response = await axios.post(
      "https://api.msg91.com/api/v5/flow/",
      {
        flow_id: process.env.MSG91_FLOW_ID,
        sender: process.env.MSG91_SENDER_ID,
        mobiles: `91${phone}`,
        otp: otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authkey: process.env.MSG91_AUTH_KEY,
        },
      }
    );

    console.log(" SMS OTP SENT SUCCESSFULLY");
    console.log("Phone:", phone);
    console.log("OTP:", otp);
    console.log(" MSG91 Response:", response.data);

    return response.data;

  } catch (error) {
    console.error(" SMS OTP FAILED");

    if (error.response) {
      console.error("MSG91 Error:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }

    throw new Error("Failed to send SMS OTP");
  }
};