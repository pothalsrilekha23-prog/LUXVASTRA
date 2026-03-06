import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Banners from "../components/Banners";
// import Footer from "./components/Footer";
import Collections from "../components/Collections";
import Brands from "../components/Brands";
import Footer from "../components/Footer";
// const banner = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600";

export default function Homepage() {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showBell, setShowBell] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const profileRef = useRef(null);
  const wishlistRef = useRef(null);
  const cartRef = useRef(null);
  const bellRef = useRef(null);

  useEffect(() => {
    const user = localStorage.getItem("lux_user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("lux_user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setShowProfile(false);
      if (wishlistRef.current && !wishlistRef.current.contains(e.target))
        setShowWishlist(false);
      if (cartRef.current && !cartRef.current.contains(e.target))
        setShowCart(false);
      if (bellRef.current && !bellRef.current.contains(e.target))
        setShowBell(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dashboard-wrapper">
      <header className="header">

        <nav className="nav">

          {/* Home */}
          <div className="category-menu">
              <div className="nav-item">
              <Link to="/home">
                <span className="nav-link">HOME</span>
              </Link>
              <div className="mega-menu">
                <div className="mega-column">
                  <h4>Living</h4>
                  <div onClick={() => navigate("/home/decor")}>Home Decor</div>
                  <div onClick={() => navigate("/home/furniture")}>Furniture</div>
                  <div onClick={() => navigate("/home/lighting")}>Lighting</div>
                  <div onClick={() => navigate("/home/wall-art")}>Wall Art</div>
                </div>
                <div className="mega-column">
                  <h4>Kitchen</h4>
                  <div onClick={() => navigate("/home/cookware")}>Cookware</div>
                  <div onClick={() => navigate("/home/appliances")}>Appliances</div>
                  <div onClick={() => navigate("/home/storage")}>Storage</div>
                  <div onClick={() => navigate("/home/dining")}>Dining</div>
                </div>
              </div>
            </div>

            {/* Men */}
            <div className="nav-item">
              <Link to="/men">
                <span className="nav-link">MEN</span>
              </Link>
              <div className="mega-menu">
                <div className="mega-column">
                  <h4>Top Wear</h4>
                  <div onClick={() => navigate("/men/shirts")}>Shirts</div>
                  <div onClick={() => navigate("/men/tshirts")}>T-Shirts</div>
                  <div onClick={() => navigate("/men/jackets")}>Jackets</div>
                  <div onClick={() => navigate("/men/sweatshirts")}>Sweatshirts</div>
                </div>
                <div className="mega-column">
                  <h4>Bottom Wear</h4>
                  <div onClick={() => navigate("/men/jeans")}>Jeans</div>
                  <div onClick={() => navigate("/men/trousers")}>Trousers</div>
                  <div onClick={() => navigate("/men/shorts")}>Shorts</div>
                  <div onClick={() => navigate("/men/trackpants")}>Track Pants</div>
                </div>
                <div className="mega-column">
                  <h4>Footwear</h4>
                  <div onClick={() => navigate("/men/shoes")}>Casual Shoes</div>
                  <div onClick={() => navigate("/men/sneakers")}>Sneakers</div>
                  <div onClick={() => navigate("/men/sandals")}>Sandals</div>
                </div>
              </div>
            </div> 

            {/* Women */}
            <div className="nav-item">
              <Link to="/women">
                <span className="nav-link">WOMEN</span>
              </Link>
              <div className="mega-menu">
                <div className="mega-column">
                  <h4>Western Wear</h4>
                  <div onClick={() => navigate("/women/tops")}>Tops</div>
                  <div onClick={() => navigate("/women/dresses")}>Dresses</div>
                  <div onClick={() => navigate("/women/jeans")}>Jeans</div>
                  <div onClick={() => navigate("/women/jackets")}>Jackets</div>
                </div>
                <div className="mega-column">
                  <h4>Ethnic Wear</h4>
                  <div onClick={() => navigate("/women/kurtas")}>Kurtas</div>
                  <div onClick={() => navigate("/women/sarees")}>Sarees</div>
                  <div onClick={() => navigate("/women/lehenga")}>Lehenga</div>
                </div>
                <div className="mega-column">
                  <h4>Footwear</h4>
                  <div onClick={() => navigate("/women/heels")}>Heels</div>
                  <div onClick={() => navigate("/women/flats")}>Flats</div>
                  <div onClick={() => navigate("/women/sneakers")}>Sneakers</div>
                </div>
              </div>
            </div> 

            {/* Kids */}
             <div className="nav-item">
              <Link to="/kids">
                <span className="nav-link">KIDS</span>
              </Link>
              <div className="mega-menu">
                <div className="mega-column">
                  <h4>Boys</h4>
                  <div onClick={() => navigate("/kids/boys/tshirts")}>T-Shirts</div>
                  <div onClick={() => navigate("/kids/boys/shirts")}>Shirts</div>
                  <div onClick={() => navigate("/kids/boys/jeans")}>Jeans</div>
                </div>
                <div className="mega-column">
                  <h4>Girls</h4>
                  <div onClick={() => navigate("/kids/girls/dresses")}>Dresses</div>
                  <div onClick={() => navigate("/kids/girls/tops")}>Tops</div>
                  <div onClick={() => navigate("/kids/girls/skirts")}>Skirts</div>
                </div>
                <div className="mega-column">
                  <h4>Baby</h4>
                  <div onClick={() => navigate("/kids/baby/clothing")}>Clothing</div>
                  <div onClick={() => navigate("/kids/baby/footwear")}>Footwear</div>
                  <div onClick={() => navigate("/kids/baby/toys")}>Toys</div>
                </div>
              </div>
            </div> 

            {/* BEAUTY */}
            <div className="nav-item">
              <Link to="/beauty">
                <span className="nav-link">Beauty</span>
              </Link>
              <div className="mega-menu">
                <div className="mega-column">
                  <h4>Skincare</h4>
                  <div onClick={() => navigate("/beauty/facewash")}>Face Wash</div>
                  <div onClick={() => navigate("/beauty/moisturizer")}>Moisturizer</div>
                  <div onClick={() => navigate("/beauty/sunscreen")}>Sunscreen</div>
                  <div onClick={() => navigate("/beauty/serum")}>Serum</div>
                </div>
                <div className="mega-column">
                  <h4>Makeup</h4>
                  <div onClick={() => navigate("/beauty/lipstick")}>Lipstick</div>
                  <div onClick={() => navigate("/beauty/foundation")}>Foundation</div>
                  <div onClick={() => navigate("/beauty/kajal")}>Kajal</div>
                  <div onClick={() => navigate("/beauty/compact")}>Compact</div>
                </div>
                <div className="mega-column">
                  <h4>Hair Care</h4>
                  <div onClick={() => navigate("/beauty/shampoo")}>Shampoo</div>
                  <div onClick={() => navigate("/beauty/conditioner")}>Conditioner</div>
                  <div onClick={() => navigate("/beauty/hair-oil")}>Hair Oil</div>
                </div>
              </div>
            </div> 
            {/* Electronics */}
            <div className="nav-item">
              <Link to="/electronics">
                <span className="nav-link">ELECTRONICS</span>
              </Link>
              <div className="mega-menu">
                <div className="mega-column">
                  <h4>Mobiles</h4>
                  <div onClick={() => navigate("/electronics/smartphones")}>Smartphones</div>
                  <div onClick={() => navigate("/electronics/feature-phones")}>Feature Phones</div>
                  <div onClick={() => navigate("/electronics/smartwatches")}>Smart Watches</div>
                  <div onClick={() => navigate("/electronics/mobile-accessories")}>Mobile Accessories</div>
                </div>

                <div className="mega-column">
                  <h4>Computers</h4>
                  <div onClick={() => navigate("/electronics/laptops")}>Laptops</div>
                  <div onClick={() => navigate("/electronics/desktops")}>Desktops</div>
                  <div onClick={() => navigate("/electronics/monitors")}>Monitors</div>
                  <div onClick={() => navigate("/electronics/printers")}>Printers</div>
                </div>

                <div className="mega-column">
                  <h4>Audio</h4>
                  <div onClick={() => navigate("/electronics/headphones")}>Headphones</div>
                  <div onClick={() => navigate("/electronics/earbuds")}>Earbuds</div>
                  <div onClick={() => navigate("/electronics/bluetooth-speakers")}>Bluetooth Speakers</div>
                  <div onClick={() => navigate("/electronics/soundbars")}>Soundbars</div>
                </div>

                <div className="mega-column">
                  <h4>Accessories</h4>
                  <div onClick={() => navigate("/electronics/powerbanks")}>Power Banks</div>
                  <div onClick={() => navigate("/electronics/memory-cards")}>Memory Cards</div>
                  <div onClick={() => navigate("/electronics/cables")}>Cables</div>
                  <div onClick={() => navigate("/electronics/networking")}>Networking</div>
                </div>
              </div>  
            </div>
          </div>


        </nav>

        <div className="header-actions">



          {/* <div className="icon-wrapper" ref={wishlistRef}>
            <div className="icon-btn" onClick={() => setShowWishlist(!showWishlist)}>
              <i className="ri-heart-3-line"></i>
              <Link to="/wishlist">
                <span>Wishlist</span>
              </Link>
            </div>
            {showWishlist && (
              <div className="dropdown">
                <p>Your wishlist is empty ❤️</p>
              </div>
            )}
          </div> */}


          {/* <div className="icon-wrapper" ref={cartRef}>
            <div className="icon-btn" onClick={() => setShowCart(!showCart)}>
              <i className="ri-shopping-bag-3-line"></i>
              <Link to="/cart">
                
                <span>Cart</span>
              </Link>
            </div>
            {showCart && (
              <div className="dropdown">
                <p>Your cart is empty 🛒</p>
              </div>
            )}
          </div> */}

          {/* <div className="icon-wrapper" ref={bellRef}>
            <div className="icon-btn" onClick={() => setShowBell(!showBell)}>
              <i className="ri-notification-3-line"></i>
              <span>🔔</span>
            </div>
            {showBell && (
              <div className="dropdown">
                <p>No new notifications </p>
              </div>
            )}
          </div> */}


          {/*<div 
          className="icon-wrapper" ref={profileRef}>
            <div className="icon-btn" onClick={() => setShowProfile(!showProfile)}>
              <i className="ri-user-3-line"></i>
              <span>Profile</span>
            </div>

            {showProfile && (
              <div className="dropdown profile-menu">
                {!isLoggedIn ? (
                  <>
                    <h4>Welcome</h4>

                    <h5>To access account and manage orders</h5>
                    <button
                      className="login-btn"
                      onClick={() => navigate("/login")}
                    >
                      LOGIN / SIGNUP
                    </button>
                    <hr />
                    <p>Orders</p>
                    <p>Wishlist</p>
                    <p>Contact Us</p>
                  </>
                ) : (
                  <>
                    <h4>Hello User 👋</h4>
                    <hr />
                    <p>My Orders</p>
                    <p>Wishlist</p>
                    <p>Saved Address</p>
                    <p>Coupons</p>
                    <hr />
                    <p onClick={handleLogout} style={{ color: "red" }}>
                      Logout
                    </p>
                  </>
                )}
              </div>
            )}
          </div>*/}
        </div>



      </header>

      <Banners />
      <div>
        <br /><br />
      </div>
      <Brands/>
      <br />
      <Collections/>
    



      <Footer />


      {/* <div
        className="dashboard"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "calc(100vh - 160px)",
          display: "flex",
          color: "#fff",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <main className="content">
          <h1>WELCOME TO HOMEPAGE</h1>
        </main>
      </div> */}
    </div>
  );
}
