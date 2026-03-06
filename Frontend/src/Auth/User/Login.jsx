// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import AuthSkeleton from "../../components/AuthSkeleton";
// import { loginRequestOtp } from "../../services/auth";
// export default function Login() {
//   const navigate = useNavigate();

//   const [input, setInput] = useState("");
//   const [errors, setErrors] = useState({});
//   const [apiError, setApiError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // const isValidEmail = (value) =>
//   //   /^[^\s@]a+@[^\s@]+\.[^\s@]+$/.test(value);

//   const isValidEmail = (value) =>
//   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(value);

//   const isValidPhone = (value) =>
//     /^[0-9]{10}$/.test(value);

//   const validate = () => {
//     let newErrors = {};
//     const value = input.trim();

//     if (!value) {
//       newErrors.input = "Email or phone number is required";
//     } else if (!isValidEmail(value) && !isValidPhone(value)) {
//       newErrors.input =
//         "Enter a valid email or 10-digit phone number";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleRequestOtp = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const value = input.trim();
//     const payload = isValidEmail(value)
//       ? { email: value }
//       : { phonenum: value };

//     try {
//       setLoading(true);
//       setApiError("");

//       await loginRequestOtp(payload);

//       navigate("/verify-otp", {
//         state: payload,
//       });
//     } catch (err) {
//       setApiError(
//         err.response?.data?.message || "Failed to send OTP"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       {/* LEFT IMAGE */}
//       <div className="image-side">
//         <div className="brand-overlay">
          
          
//         </div>
//       </div>

//       {/* RIGHT FORM */}
//       <div className="login-side">
//         {loading ? (
//           <AuthSkeleton />
//         ) : (
//           <div className="login-card">
//             {/* ✅ UPDATED TEXT */}
//             <h2>Welcome!</h2>
//             <p className="subtitle">
//               Login to LUXVASTRA
//             </p>

//             {/* ✅ INPUT FIRST */}
//             <form onSubmit={handleRequestOtp} noValidate>
//               <input
//                 type="text"
//                 placeholder="Email or Phone Number"
//                 value={input}
//                 onChange={(e) => {
//                   setInput(e.target.value);
//                   setErrors({});
//                   setApiError("");
//                 }}
//                 className={errors.input ? "input-error" : ""}
//               />

//               {errors.input && (
//                 <p className="error-text">{errors.input}</p>
//               )}

//               {apiError && (
//                 <p className="error-text">{apiError}</p>
//               )}

//               <button type="submit" disabled={loading}>
//                 {loading ? "Sending OTP..." : "Request OTP"}
//               </button>
//             </form>

//             {/* ✅ DIVIDER */}
//             <div className="divider">
//               <span>OR</span>
//             </div>

//             {/* ✅ GOOGLE AT BOTTOM */}
//             <button
//               className="google-login-btn"
//               type="button"
//             >
//               Continue with Google
//             </button>

//             <Link className="link" to="/register">
//               New user? Register here
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthSkeleton from "../../components/AuthSkeleton";
import { loginRequestOtp } from "../../services/auth";
export default function Login() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isValidPhone = (value) =>
    /^[0-9]{10}$/.test(value);

  const validate = () => {
    let newErrors = {};
    const value = input.trim();

    if (!value) {
      newErrors.input = "Email or phone number is required";
    } else if (!isValidEmail(value) && !isValidPhone(value)) {
      newErrors.input =
        "Enter a valid email or 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const value = input.trim();
    const payload = isValidEmail(value)
  ? { email: value }
  : { phonenumber: value };

    try {
      setLoading(true);
      setApiError("");

      await loginRequestOtp(payload);

      navigate("/verify-otp", {
        state: payload,
      });
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT IMAGE */}
      <div className="image-side">
        <div className="brand-overlay">
          
          
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="login-side">
        {loading ? (
          <AuthSkeleton />
        ) : (
          <div className="login-card">
            {/* ✅ UPDATED TEXT */}
            <h2>Welcome!</h2>
            <p className="subtitle">
              Login to LUXVASTRA
            </p>

            {/* ✅ INPUT FIRST */}
            <form onSubmit={handleRequestOtp} noValidate>
              <input
                type="text"
                placeholder="Email or Phone Number"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setErrors({});
                  setApiError("");
                }}
                className={errors.input ? "input-error" : ""}
              />

              {errors.input && (
                <p className="error-text">{errors.input}</p>
              )}

              {apiError && (
                <p className="error-text">{apiError}</p>
              )}

              <button type="submit" disabled={loading}>
                {loading ? "Sending OTP..." : "Request OTP"}
              </button>
            </form>

            {/* ✅ DIVIDER */}
            <div className="divider">
              <span>OR</span>
            </div>

            {/* ✅ GOOGLE AT BOTTOM */}
            <button
              className="google-login-btn"
              type="button"
            >
              Continue with Google
            </button>

            <Link className="link" to="/register">
              New user? Register here
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}