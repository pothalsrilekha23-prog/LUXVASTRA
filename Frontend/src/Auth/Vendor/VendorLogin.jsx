import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../../styles/auth.css";

export default function VendorLogin() {
  const navigate = useNavigate();

  const [forgot, setForgot] = useState(false);
  const [register, setRegister] = useState(false);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateLogin = () => {
    let err = {};
    if (!form.email) err.email = "Email or Vendor ID is required";
    if (!form.password) err.password = "Password is required";
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

  const validateRegister = () => {
    let err = {};
    if (!form.firstName) err.firstName = "First name is required";
    if (!form.lastName) err.lastName = "Last name is required";

    if (!form.email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid email format";

    if (!form.phone) err.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone))
      err.phone = "Phone number must be 10 digits";

    if (!form.password || form.password.length < 6)
      err.password = "Password must be at least 6 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  return (
    <div className="auth-container">
      <div className="image-side">
        <div className="brand-overlay">
          
        </div>
      </div>

      <div className="login-side">
        <div className="login-card">

        
          {!forgot && !register && (
            <>
              <h2>Vendor Login</h2>

              <input
                type="text"
                name="email"
                placeholder="Vendor Email / ID"
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              {errors.password && <span className="error">{errors.password}</span>}

              <button
                onClick={() => {
                  if (validateLogin()) navigate("/vendordashboard");
                }}
              >
                Login
              </button>

              <span className="link" onClick={() => setForgot(true)}>
                Forgot Password?
              </span>

              <span className="link" onClick={() => setRegister(true)}>
                New Vendor? Register here
              </span>

              <span className="link" onClick={() => navigate("/")}>
                Back to User Login
              </span>
            </>
          )}

          
          {forgot && (
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
                  if (validateReset()) setForgot(false);
                }}
              >
                Reset Password
              </button>

              <span className="link" onClick={() => setForgot(false)}>
                Back to Login
              </span>
            </>
          )}

          
          {register && (
            <>
              <h2>Vendor Registration</h2>

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}

              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              {errors.password && <span className="error">{errors.password}</span>}

              <button
                onClick={() => {
                  if (validateRegister()) setRegister(false);
                }}
              >
                Register
              </button>

              <span className="link" onClick={() => setRegister(false)}>
                Back to Login
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}