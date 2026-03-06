// import { useState } from "react";
// import "../styles/global.css";

// const categories = [
//   {
//     title: "Men",
//     img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600",
//     description: "Explore the latest trends in men's fashion.",
//     price: "12",
//   },
//   {
//     title: "Men",
//     img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600",
//     description: "Explore the latest trends in men's fashion.",
//     price: "12",
//   },
//   {
//     title: "Men",
//     img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600",
//     description: "Explore the latest trends in men's fashion.",
//     price: "12",
//   },
//   {
//     title: "Men",
//     img: "https://images.unsplash.com/photo-1509498746926-5c6ebc8abaed?w=600",
//     description: "Stylish casual wear for men.",
//     price: "50",
//   },
//   {
//     title: "Men",
//     img: "https://images.unsplash.com/photo-1533331348232-4b324637dce3?w=600",
//     description: "Formal shirts for special occasions.",
//     price: "80",
//   },
//   {
//     title: "Men",
//     img: "https://images.unsplash.com/photo-1473978043012-686f57e75687?w=600",
//     description: "Comfortable athletic wear for active lifestyles.",
//     price: "30",
//   },
//   {
//     title: "Accessories",
//     img: "https://images.unsplash.com/photo-1511082635652-66f79a80cbf5?w=600",
//     description: "Stylish accessories for everyone.",
//     price: "150",
//   },
//   {
//     title: "Accessories",
//     img: "https://images.unsplash.com/photo-1602929469001-a2aaeec0f4cf?w=600",
//     description: "Fashionable belts to complement your outfit.",
//     price: "35",
//   },
//   {
//     title: "Accessories",
//     img: "https://images.unsplash.com/photo-1521982192545-f5155226b330?w=600",
//     description: "Elegant watches for every occasion.",
//     price: "120",
//   },
  
//    {
//     title: "Accessories",
//     img: "https://images.unsplash.com/photo-1521982192545-f5155226b330?w=600",
//     description: "Elegant watches for every occasion.",
//     price: "120",
//   },{
//     title: "Footwear",
//     img: "https://images.unsplash.com/photo-1472573080307-1c3178101d00?w=600",
//     description: "Trendy footwear for every occasion.",
//     price: "300",
//   },
//   {
//     title: "Footwear",
//     img: "https://images.unsplash.com/photo-1585093231060-e82f0507ef62?w=600",
//     description: "Comfortable sneakers for everyday wear.",
//     price: "100",
//   },
//   {
//     title: "Footwear",
//     img: "https://images.unsplash.com/photo-1608910364074-8aa3253144b7?w=600",
//     description: "Formal shoes for business events.",
//     price: "250",
//   },
//   {
//     title: "Footwear",
//     img: "https://images.unsplash.com/photo-1518475206549-e1e6aabd1b23?w=600",
//     description: "Stylish sandals for warm weather.",
//     price: "40",
//   },
// ];

// // Function to create a section for each distinct title category
// function CollectionSection({ title, items }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const itemsPerSlide = 4;
//   const maxIndex = Math.floor(items.length / itemsPerSlide) - 1;

//   const nextSlide = () => {
//     if (currentIndex < maxIndex) {
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const prevSlide = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   return (
//     <section className="collections">
//       <h2 className="">{title} </h2>
//       <div className="collection-slider">
//         <button className="arrow left" onClick={prevSlide} disabled={currentIndex === 0}>
//           ‹
//         </button>
//         <div
//           className="collection-grid"
//           style={{ transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)` }}
//         >
//           {items
//             .slice(currentIndex * itemsPerSlide, (currentIndex + 1) * itemsPerSlide)
//             .map((item, index) => (
//               <div className="collection-card" key={index}>
//                 <img src={item.img} alt={item.title} />
//                 <div className="overlay">
//                   <h3>{item.title}</h3>
//                 </div>
//               </div>
//             ))}
//         </div>
//         <button className="arrow right" onClick={nextSlide} disabled={currentIndex === maxIndex}>
//           ›
//         </button>
//       </div>
//     </section>
//   );
// }

// export default function Collections() {
//   const categoriesMap = categories.reduce((acc, category) => {
//     // Initialize the array for each title if it doesn't exist
//     if (!acc[category.title]) {
//       acc[category.title] = [];
//     }
//     // Add the category to the correct title array
//     acc[category.title].push(category);
//     return acc;
//   }, {});

//   return (
//     <>
//       {Object.entries(categoriesMap).map(([title, items]) => (
//         <CollectionSection key={title} title={title} items={items} />
//       ))}
//     </>
//   );
// }


 import { useState } from "react";
import "../styles/global.css";


/* =======================
   DATA
======================= */
const categories = [
  // Westernwear
  { 
  title: "Westernwear", 
  label: "Premium Polos", 
  img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=900" 
},

{ 
  title: "Westernwear", 
  label: "Smart Casual Shirts", 
  img: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=900" 
},

{ 
  title: "Westernwear", 
  label: "Urban Denim", 
  img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=900" 
},

{ 
  title: "Westernwear", 
  label: "Tailored Blazers", 
  img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900" 
},
  { 
  title: "Dainty Accessories", 
  label: "Luxury Watches", 
  img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900" 
},

{ 
  title: "Dainty Accessories", 
  label: "Signature Sunglasses", 
  img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900" 
},

{ 
  title: "Dainty Accessories", 
  label: "Designer Belts", 
  img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=900" 
},

{ 
  title: "Dainty Accessories", 
  label: "Minimal Jewellery", 
  img: "https://images.unsplash.com/photo-1602752250015-52934bc45613?w=900" 
},
// Footwear
{ 
  title: "Elite Footwear", 
  label: "Classic Sneakers", 
  img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900" 
},

{ 
  title: "Elite Footwear", 
  label: "Formal Leather Shoes", 
  img: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=900" 
},
{ 
  title: "Elite Footwear", 
  label: "Street Trainers", 
  img: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=900" 
},
{ 
  title: "Elite Footwear", 
  label: "Summer Sandals", 
  img: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=900" 
},
];

/* =======================
   SECTION COMPONENT
======================= */
function CollectionSection({ title, items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 4;

  const maxIndex =
    items.length > itemsPerSlide
      ? Math.ceil(items.length / itemsPerSlide) - 1
      : 0;

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="collections">
      <h2 className="section-title">{title}</h2>

      <div className="slider-container">
        <button
          className="arrow left"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          ‹
        </button>

       <div className="slider-wrapper">
  <div
    className="slider-track"
    style={{
      transform: `translateX(-${currentIndex * (100 / (items.length / itemsPerSlide))}%)`,
      width: `${(items.length / itemsPerSlide) * 100}%`,
    }}
  >
    {items.map((item, index) => (
      <div
        className="card"
        key={index}
        style={{ width: `${100 / items.length}%` }}
      >
        <img src={item.img} alt={item.label} />
        <div className="overlay">
          <h3>{item.label}</h3>
        </div>
      </div>
    ))}
  </div>
</div>

        <button
          className="arrow right"
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
        >
          ›
        </button>
      </div>
    </section>
  );
}

/* =======================
   MAIN COMPONENT
======================= */
export default function Collections() {
  const sections = [...new Set(categories.map((item) => item.title))];

  return (
    <>
      {sections.map((section) => (
        <CollectionSection
          key={section}
          title={section}
          items={categories.filter((item) => item.title === section)}
        />
      ))}
    </>
  );
}