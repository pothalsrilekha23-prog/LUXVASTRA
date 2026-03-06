import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems] = useState([]);

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        /* ================= EMPTY CART ================= */
        <div className="cart-container empty">
          <div className="cart-empty-box">
            <div className="cart-icon">🛒</div>

            <h2 className="cart-title">Hey, it feels so light!</h2>
            <p className="cart-subtitle">
              There is nothing in your cart.
            </p>

            <button
              className="cart-btn"
              onClick={() => navigate("/wishlist")}
            >
              ADD ITEMS FROM WISHLIST
            </button>
          </div>
        </div>
      ) : (
        /* ================= FILLED CART ================= */
        <div className="cart-container filled">
          <div className="cart-left">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                />
                <div>
                  <h4 className="cart-item-title">{item.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;