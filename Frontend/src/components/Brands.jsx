import React, { useEffect, useRef, useState } from "react";

const brandsData = [
  
  {
    id: 2,
    name: "Adidas",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
  },
  {
    id: 3,
    name: "Puma",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/Puma-logo-%28text%29.svg",
  },
  {
    id: 4,
    name: "Under Armour",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg",
  },
  
  {
    id: 6,
    name: "kappa",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/32/Kappa_logo.svg",
  },
  {
    id: 7,
    name: "Balenciaaga",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/4b/Balenciaga_Logo.svg",
  },
  {
    id: 8,
    name: "Levi's",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/02/Levi%27s_logo_%282011%29.svg",
  },
  { id: 1, name: "Nike", 
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Nike_logo_1978.svg"
    
  },
  {
    id: 9,
    name: "Forever 21",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Furla_-_logo_%28Italy%2C_2019%29.svg",
  },
  {
    id: 10,
    name: "Gap",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Gap_logo.svg",
  },
  {
    id: 11,
    name: "Orseyy",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5d/ORSAY.svg",
  },
  {
    id: 12,
    name: "American Eagle",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/Quiksilver_wordmark_2015.svg",
  },
  {
    id: 13,
    name: "Mavi",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d6/Mavi_Jeans_Logo.svg",
  },
  {
    id: 14,
    name: "Uniqlo",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/Uniqlo_1999.svg",
  },
  {
    id: 15,
    name: "Boss",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/Boss_logo_2021.svg",
  },
];

const Brands = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 5;
  const totalItems = brandsData.length;
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % (totalItems - itemsPerSlide + 1);
      updateScrollPosition(newIndex);
      return newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex =
        (prevIndex - 1 + (totalItems - itemsPerSlide + 1)) %
        (totalItems - itemsPerSlide + 1);
      updateScrollPosition(newIndex);
      return newIndex;
    });
  };

  const updateScrollPosition = (index) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, );

  const displayedBrands = brandsData.slice(
    currentIndex,
    currentIndex + itemsPerSlide,
  );

  useEffect(() => {
    updateScrollPosition(currentIndex);
  }, [currentIndex]);

  return (
    <div className="relative mx-auto flex items-center justify-center p-4">
      <button
        className="banner-arrow left-0 absolute z-20 bg-gray-500 text-black h-14 w-14 rounded-full shadow-lg transform hover:bg-gray-400 transition-all duration-300 ease-in-out"
        onClick={prevSlide}
      >
        ‹
      </button>

      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out w-full overflow-hidden"
      >
        {displayedBrands.map((brand) => (
          <div
            key={brand.id}
            className="flex-shrink-0 w-[calc(100%/_5)] h-40 p-3 flex flex-col items-center justify-center mx-2 bg-white shadow-lg rounded-lg border border-transparent"
          >
            <img
              src={brand.logoUrl}
              alt={`${brand.name}`}
              className="w-full h-28 object-contain rounded-t-lg"
            />
            <br/>
            <h2 className="text-center mt-2 font-semibold">{brand.name}</h2>
          </div>
        ))}
      </div>

      <button
        className="banner-arrow right-0 absolute z-20 bg-gray-500 text-black h-14 w-14 rounded-full shadow-lg transform hover:bg-gray-400 transition-all duration-300 ease-in-out"
        onClick={nextSlide}
      >
        ›
      </button>
    </div>
  );
};

export default Brands;