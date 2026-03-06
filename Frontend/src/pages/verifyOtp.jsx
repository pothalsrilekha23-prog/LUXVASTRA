import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");

  const userData = location.state; // { email } OR { phonenum }

  // 🔒 Redirect if opened directly
  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  // ⏳ Countdown Timer (ESLint safe version)
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // 🔐 VERIFY OTP
  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("Enter complete 6-digit OTP");
      return;
    }

    try {
      setError("");

      const payload = userData.email
        ? { email: userData.email, otp: finalOtp }
        : { phonenumber: userData.phonenum, otp: finalOtp };

      await axios.post(
  "http://localhost:4000/auth/user-loginverify",
  payload,
  { withCredentials: true }
);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  };

  // 🔄 RESEND OTP
  const handleResend = async () => {
  

  try {
    const payload = {
      email: userData.email || null,
      phonenumber: userData.phonenum || userData.phonenumber || null,
    };

    await axios.post(
      "http://localhost:4000/auth/user-login",
      payload
    );

    setOtp(["", "", "", "", "", ""]);
    setTimer(30);
    setError("");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="otp-page">
      <div className="otp-card">
        <div className="otp-icon">OTP</div>

        <h2 className="otp-title">Verify OTP</h2>
        <p className="otp-subtitle">
          Enter the 6-digit code sent to <b>your contact</b>
        </p>

        <div className="otp-input-group">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              className="otp-input"
            />
          ))}
        </div>

        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {error}
          </p>
        )}

        <button
          className="otp-verify-btn"
          onClick={handleVerify}
        >
          Verify OTP
        </button>

       <div className="otp-resend">
        <button
          onClick={handleResend}
          disabled={timer > 0}
          className="resend-btn"
        >
          {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
        </button>
        </div>
      </div>
    </div>
  );
}