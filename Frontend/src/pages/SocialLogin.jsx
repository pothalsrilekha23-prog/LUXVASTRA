import { useNavigate } from "react-router-dom";
// import "../styles/auth.css";
export default function SocialLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/homepage"); // change route if needed
  };

  return (
    <div className="auth-container">
      <div className="social-card">
        <h2>Continue With</h2>
        <p>Choose your preferred login method</p>

        <button className="social-btn google" onClick={handleLogin}>
          Continue with Google
        </button>

        <button className="social-btn facebook" onClick={handleLogin}>
          Continue with Facebook
        </button>

        <button className="lux-btn" onClick={() => navigate("/login")}>
          Back to Email Login
        </button>
      </div>
    </div>
  );
}
