import React from "react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔒 If not logged in
  if (!token) {
    return (
      <div className="wishlist-container">
        <div className="wishlist-login-container">
          <div className="wishlist-box">
            <div className="brand-name">LUXVASTRA</div>

            <h2 className="wishlist-title">PLEASE LOG IN</h2>
            <p className="wishlist-subtitle">
              Login to view items in your wishlist.
            </p>

            <button
              className="wishlist-login-btn"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ If logged in
  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold">Wishlist Items Here</h1>
    </div>
  );
};

export default Wishlist;