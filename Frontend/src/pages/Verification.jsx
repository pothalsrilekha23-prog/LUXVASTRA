
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import "../styles/Verification.css";
import { verifyOtp, resendOtp } from "../services/auth";

export default function Verification() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || null;
  const phonenum = location.state?.phonenum || null;

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const inputsRef = useRef([]);

  /* 🔐 Prevent direct access */
  useEffect(() => {
    if (!email && !phonenum) {
      navigate("/register");
    }
  }, [email, phonenum, navigate]);

  /* ================= OTP INPUT ================= */
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    setError("");
    setHasError(false);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Enter complete 6-digit OTP");
      setHasError(true);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        otp: enteredOtp,
        ...(email && { email }),
        ...(phonenum && { phonenum }),
      };

      const res = await verifyOtp(payload);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate("/Homepage");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESEND OTP ================= */
  const handleResend = async () => {
    try {
      setResendLoading(true);
      await resendOtp({
        ...(email && { email }),
        ...(phonenum && { phonenum }),
      });
    } catch {
      setError("Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <h2>Verify OTP</h2>

        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              className={hasError ? "error" : ""}
            />
          ))}
        </div>

        {error && <p className="error-text">{error}</p>}

        <button onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="resend" onClick={handleResend}>
          {resendLoading ? "Sending..." : "Resend OTP"}
        </p>
      </div>
    </div>
  );
}