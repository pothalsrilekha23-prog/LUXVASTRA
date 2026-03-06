function CartDrawer({ cartItems = [] }) {
  if (cartItems.length === 0) {
    return (
      <div className="drawer-empty">
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div>
      {/* cart items */}
    </div>
  );
}

export default CartDrawer;