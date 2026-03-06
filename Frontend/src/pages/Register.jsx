import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../styles/auth.css";
import { requestOtp } from "../services/auth";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenum: "", // optional
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError("");
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (formData.phonenum && !/^[0-9]{10}$/.test(formData.phonenum)) {
      newErrors.phonenum = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    const payload = {
      name: formData.name,
      email: formData.email,
      ...(formData.phonenum && { phonenum: formData.phonenum }),
    };

    try {
      setLoading(true);
      await requestOtp(payload);

      navigate("/verify", {
        state: {
          name:formData.name,
          email: formData.email,
          phonenum: formData.phonenum,
        },
      });
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="login-side">
        <div className="login-card">
          <h2>Create Account</h2>

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            name="phonenum"
            placeholder="Phonenum"
            value={formData.phonenum}
            onChange={handleChange}
            className={errors.phonenum ? "input-error" : ""}
          />
          {errors.phonenum && <p className="error-text">{errors.phonenum}</p>}

          {apiError && <p className="error-text">{apiError}</p>}

          <button onClick={handleRegister} disabled={loading}>
            {loading ? "Sending OTP..." : "register"}
          </button>
        </div>
      </div>
    </div>
  );
}