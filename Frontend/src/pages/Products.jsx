import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`http://localhost:4000/api/auth/product?keyword=${keyword}`)
        ;

        setProducts(response.data.data || response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">
        {keyword ? `Search Results for "${keyword}"` : "All Products"}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.slug}`)}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="font-semibold text-lg mb-2">
                {product.title}
              </h3>

              <p className="text-gray-600 mb-2">
                ₹ {product.price}
              </p>

              <p className="text-sm text-gray-500">
                Rating: {product.rating}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}