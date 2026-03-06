import { useState, useEffect } from "react";

const bannerData = [
  {
    id: 1,
    title: "Festive Collection 2026",
    subtitle: "Celebrate in Style",
    description:
      "Handcrafted Banarasi & Kanjivaram sarees with intricate zari work",
    cta: "Shop Sarees",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600",
  },
  {
    id: 2,
    title: "Wedding Season Sale",
    subtitle: "Up to 40% Off",
    description:
      "Designer Lehengas, Sherwanis & bridal wear for the perfect day",
    cta: "Shop Wedding Wear",
    image:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1600",
  },
  {
    id: 3,
    title: "Summer Kurta Edit",
    subtitle: "New Arrivals",
    description:
      "Lightweight cotton & linen kurtas for effortless everyday elegance",
    cta: "Shop Kurtas",
    image:
      "https://images.unsplash.com/photo-1622473590773-f588134b6ce7?q=80&w=1600",
  },
  {
    id: 4,
    title: "Royal Sherwani Collection",
    subtitle: "Exclusive Launch",
    description:
      "Premium silk & velvet sherwanis crafted by master artisans",
    cta: "Shop Sherwanis",
    image:
      "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?q=80&w=1600",
  },
];

export default function Banners() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? bannerData.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % bannerData.length);
  };

  return (
    <div className="banner-container">
      {bannerData.map((banner, index) => (
        <div
          key={banner.id}
          className={`banner-slide ${index === current ? "active" : ""}`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="banner-image"
          />

          <div className="banner-overlay" />

          <div className="banner-content">
            <p className="banner-subtitle">{banner.subtitle}</p>
            <h1 className="banner-title">{banner.title}</h1>
            <p className="banner-description">{banner.description}</p>
            <button className="banner-btn">{banner.cta} →</button>
          </div>
        </div>
      ))}

      <button className="banner-arrow left" onClick={prevSlide}>
        ‹
      </button>

      <button className="banner-arrow right" onClick={nextSlide}>
        ›
      </button>

      <div className="banner-dots">
        {bannerData.map((_, index) => (
          <div
            key={index}
            className={`banner-dot ${index === current ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Banners() {
//   const [banners, setBanners] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // 🔵 Fetch banners from backend
//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:4000/api/auth/banners/allbanners"
//         );
//         setBanners(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load banners");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBanners();
//   }, []);

//   // 🔵 Auto slide
//   useEffect(() => {
//     if (banners.length === 0) return;

//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % banners.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [banners]);

//   const prevSlide = () => {
//     setCurrent((prev) =>
//       prev === 0 ? banners.length - 1 : prev - 1
//     );
//   };

//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % banners.length);
//   };

//   if (loading) return <div className="banner-loading">Loading...</div>;
//   if (error) return <div className="banner-error">{error}</div>;
//   if (banners.length === 0)
//     return <div className="banner-empty">No banners available</div>;

//   return (
//     <div className="banner-container">
//       {banners.map((banner, index) => (
//         <div
//           key={banner.id}
//           className={`banner-slide ${index === current ? "active" : ""}`}
//         >
//           <img
//             src={banner.image_url}
//             alt={banner.title}
//             className="banner-image"
//           />

//           <div className="banner-overlay" />

//           <div className="banner-content">
//             <p className="banner-subtitle">{banner.subtitle}</p>
//             <h1 className="banner-title">{banner.title}</h1>
//             <p className="banner-description">{banner.description}</p>
//             <button className="banner-btn">
//               {banner.cta} →
//             </button>
//           </div>
//         </div>
//       ))}

//       <button className="banner-arrow left" onClick={prevSlide}>
//         ‹
//       </button>

//       <button className="banner-arrow right" onClick={nextSlide}>
//         ›
//       </button>

//       <div className="banner-dots">
//         {banners.map((_, index) => (
//           <div
//             key={index}
//             className={`banner-dot ${
//               index === current ? "active" : ""
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }