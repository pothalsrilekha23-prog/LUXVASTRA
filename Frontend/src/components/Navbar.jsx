// import { Link } from "react-router-dom";
// import { Heart, ShoppingBag, User, MapPin } from "lucide-react";

// const Navbar = () => {
//   return (
//     <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">

//         {/*  LEFT — LOGO + PINCODE */}
//         <div className="flex items-center gap-15 min-w-[260px]">
//           <Link to="/" className="text-4xl font-bold tracking-wide">
//             LuxVastra
//           </Link>

//           {/* PINCODE */}
//           <div className="hidden md:flex items-center gap-2 text-sm cursor-pointer">
//             <MapPin size={16} />
//             <span className=" font-bold"> Deliver Here</span>
//           </div>
//         </div>

//         {/* CENTER — SEARCH BAR */}
//         <div className="flex-1 flex justify-center px-4">
//           <input
//             type="text"
//             placeholder="Search For Products, Brands....."
//             className="hidden md:block w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//         </div>

//         {/* RIGHT — ICONS */}
//         <div className="flex items-center gap-6 min-w-[220px] justify-end">
//           <Link
//             to="/wishlist"
//             className="flex flex-col items-center text-sm hover:text-pink-500"
//           >
//             <Heart size={20} />
//             Wishlist
//           </Link>

//           <Link
//             to="/cart"
//             className="flex flex-col items-center text-sm hover:text-pink-500"
//           >
//             <ShoppingBag size={20} />
//             Cart
//           </Link>

//           <Link
//             to="/login"
//             className="flex flex-col items-center text-sm hover:text-pink-500"
//           >
//             <User size={20} />
//             Profile
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, User, MapPin } from "lucide-react";
import { useState, useRef } from "react";
import Pincode from "./Pincode";


const Navbar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (!keyword.trim()) return;

      navigate(`/products?keyword=${keyword}`);
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-[9999]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">

        {/* 🔶 LEFT — LOGO + PINCODE */}
        <div className="flex items-center gap-6 min-w-[260px]">
          <Link to="/homepage" className="text-4xl font-bold tracking-wide">
            LuxVastra
          </Link>
              <Pincode/>
          {/* <div className="hidden md:flex items-center gap-1 text-sm cursor-pointer">
            <MapPin size={16} />
            <span className="underline font-medium">Select Pincode</span>
          </div> */}
        </div>

        {/* 🔶 CENTER — SEARCH BAR */}
        <div className="flex-1 flex justify-center px-4">
          <input
            type="text"
            placeholder="Search for products, brands"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleSearch}
            className="hidden md:block w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* 🔶 RIGHT — ICONS */}
        <div className="flex items-center gap-6 min-w-[220px] justify-end">
          <Link
            to="/wishlist"
            className="flex flex-col items-center text-sm hover:text-pink-500"
          >
            <Heart size={20} />
            Wishlist
          </Link>

          <Link
            to="/cart"
            className="flex flex-col items-center text-sm hover:text-pink-500"
          >
            <ShoppingBag size={20} />
            Cart
          </Link>

          <div
            className="profile-wrapper"
            ref={profileRef}
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >
            <div className="profile-trigger">
              <User size={20} />
              <span>Profile</span>
            </div>

            {showProfile && (
              <div className="profile-dropdown">
                {!isLoggedIn ? (
                  <>
                    <h4 className="font-semibold mb-1">Welcome</h4>
                    <p className="text-sm text-gray-500 mb-3">
                      To access account and manage orders
                    </p>

                    <button
                      className="login-btn"
                      onClick={() => navigate("/login")}
                    >
                      LOGIN / SIGNUP
                    </button>

                    <hr className="my-3" />
                    <p>Orders</p>
                    <p>Wishlist</p>
                    <p>Contact Us</p>
                  </>
                ) : (
                  <>
                    <h4 className="font-semibold mb-2">Hello User 👋</h4>
                    <hr className="my-3" />
                    <p>My Orders</p>
                    <p>Wishlist</p>
                    <p>Saved Address</p>
                    <p>Coupons</p>
                    <hr className="my-3" />
                    <p
                      onClick={handleLogout}
                      className="text-red-500 cursor-pointer"
                    >
                      Logout
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;