import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import ProductDetails from "./pages/ProductDetails";

/* USER */
import Navbar from "./components/Navbar";
import Login from "./Auth/User/Login.jsx";
import SocialLogin from "./pages/SocialLogin.jsx";
import Register from "./pages/Register.jsx";
import Homepage from "./pages/Homepage.jsx";
import Verification from "./pages/Verification.jsx";
import VerifyOtp from "./pages/verifyOtp.jsx";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";

/* ADMIN */
import AdminLogin from "./Auth/Admin/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Categories from "./pages/admin/Categories.jsx";
import Attributes from "./pages/admin/Attributes.jsx";
import ApproveProducts from "./pages/admin/ApproveProducts.jsx";
import FeaturedProducts from "./pages/admin/FeaturedProducts.jsx";
import BrandManagement from "./pages/admin/BrandManagement.jsx";

/* VENDOR */
import VendorLogin from "./Auth/Vendor/VendorLogin.jsx";
import VendorDashboard from "./pages/VendorDashboard.jsx";

function App() {
  const [cart,] = useState([]);

  return (
    <>
      {/* ✅ Navbar OUTSIDE Routes */}
      <Navbar cartCount={cart.length} />

      <Routes>
        {/* User Routes */}
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/social-login" element={<SocialLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Navigate to="/homepage" />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/Categories" element={<Categories />} />
        <Route path="/admin/attributes" element={<Attributes />} />
        <Route path="/admin/approve-products" element={<ApproveProducts />} />
        <Route path="/admin/featured-products" element={<FeaturedProducts />} />
        <Route path="/admin/brands" element={<BrandManagement />} />

        {/* Vendor */}
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/vendordashboard" element={<VendorDashboard />} />
      </Routes>
    </>
  );
}

export default App;