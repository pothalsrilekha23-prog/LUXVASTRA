import axios from "axios";

// Correct backend URL (no extra /api)
const BASE_URL = "http://localhost:4000/api/auth";

export const requestOtp = (payload) => {
  return axios.post(`${BASE_URL}/user-registerrequest`, payload);
};

export const verifyOtp = (payload) => {
  return axios.post(`${BASE_URL}/user-registerverify`, payload);
};

export const resendOtp = (payload) => {
  return axios.post(`${BASE_URL}/user-registerresendotp`, payload); 

};



/* ===============================
   LOGIN APIs
================================ */

export const loginRequestOtp = (payload) => {
console.log(payload);
  return axios.post(`${BASE_URL}/user-login`, payload);
  
};

export const loginVerifyOtp = (payload) => {
  return axios.post(`${BASE_URL}/user-loginverify`, payload);
};

export const logresendOtp = (payload) => {
  return axios.post(`${BASE_URL}/resend-otp`, payload);
};