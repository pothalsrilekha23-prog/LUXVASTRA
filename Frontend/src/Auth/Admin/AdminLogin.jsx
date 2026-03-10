import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "../../styles/auth.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [forgotPassword, setForgotPassword] = useState(false);
  const [registerAdmin, setRegisterAdmin] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

 

  const validateRegister = () => {
    let err = {};
    if (!form.name) err.name = "Full name is required";
    if (!form.email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid email format";
    if (!form.password || form.password.length < 6)
      err.password = "Password must be at least 6 characters";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateReset = () => {
    let err = {};
    if (!form.newPassword || form.newPassword.length < 6)
      err.newPassword = "Password must be at least 6 characters";
    if (form.newPassword !== form.confirmPassword)
      err.confirmPassword = "Passwords do not match";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleGoogleAdminLogin = () => {
    if (!window.google) {
      alert("Google SDK not loaded");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID",
      callback: handleGoogleAdminResponse,
    });

    window.google.accounts.id.prompt();
  };

  const handleGoogleAdminResponse = (response) => {
    sendGoogleAdminTokenToBackend(response.credential);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const validateLogin = () => {
    let err = {};
    if (!form.email) err.email = "Email or Admin ID is required";
    if (!form.password) err.password = "Password is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleAdminLogin = async () => {
    if (!validateLogin()) return;
        

    try {
      const res = await adminLoginBackend({
        email,
      password
      });

      console.log(res);

      if (res.success) {
        navigate("/admindashboard");
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  


 const adminLoginBackend = async (data) => {
  const response = await axios.post(
    "http://localhost:4000/api/auth/admin-login",
    data
  );

  return response.data;
};




  const sendGoogleAdminTokenToBackend = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/auth/google/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admindashboard");
      } else {
        alert(data.message || "Admin Google login failed");
      }
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="image-side">
        <div className="brand-overlay">

        </div>
      </div>

      <div className="login-side">
        <div className="login-card">
          {!forgotPassword && !registerAdmin && (
            <>
              <h2>Admin Login</h2>

              <button
                className="google-login-btn"
                onClick={handleGoogleAdminLogin}
              >
                <span className="google-icon">
                  <svg width="18" height="18" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.82 2.2 30.28 0 24 0 14.64 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.27 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.5 24c0-1.64-.15-3.22-.43-4.74H24v9h12.7c-.55 2.9-2.18 5.36-4.6 7.04l7.45 5.78C43.98 36.78 46.5 30.9 46.5 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.54 28.41c-.48-1.45-.76-2.99-.76-4.41s.27-2.96.76-4.41l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.6l7.98-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.92-2.13 15.9-5.8l-7.45-5.78c-2.06 1.38-4.7 2.19-8.45 2.19-6.26 0-11.57-3.77-13.46-8.91l-7.98 6.19C6.51 42.62 14.64 48 24 48z"
                    />
                  </svg>
                </span>
                <span className="google-text">Continue with Google (Admin)</span>
              </button>

              <div className="divider">
                <span>OR</span>
              </div>

              <input
                type="text"
                name="email"
                placeholder="Admin Email / ID"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="error">{errors.email}</span>
              )}

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}

              <button onClick={handleAdminLogin}>
                Login
              </button>

              <p
                className="link"
                onClick={() => setForgotPassword(true)}
              >
                Forgot password?
              </p>

              <p
                className="link"
                onClick={() => navigate("/")}
              >
                Back to User Login
              </p>
            </>
          )}

          {forgotPassword && (
            <>
              <h2>Reset Password</h2>

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={handleChange}
              />
              {errors.newPassword && (
                <span className="error">{errors.newPassword}</span>
              )}

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}

              <button
                onClick={() => {
                  if (validateReset()) setForgotPassword(false);
                }}
              >
                Reset Password
              </button>

              <p
                className="link"
                onClick={() => setForgotPassword(false)}
              >
                Back to Login
              </p>
            </>
          )}

          {registerAdmin && (
            <>
              <h2>Admin Registration</h2>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
              />
              {errors.name && (
                <span className="error">{errors.name}</span>
              )}

              <input
                type="text"
                name="email"
                placeholder="Admin Email"
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error">{errors.email}</span>
              )}

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}

              <button
                onClick={() => {
                  if (validateRegister()) setRegisterAdmin(false);
                }}
              >
                Register
              </button>

              <p
                className="link"
                onClick={() => setRegisterAdmin(false)}
              >
                Back to Login
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}