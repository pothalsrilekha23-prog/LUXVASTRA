import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/auth/product/slug/${slug}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [slug]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <p>Price: ₹{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetails;