import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!keyword.trim()) return;

    navigate(`/products?keyword=${keyword}`);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder="Search for products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();   // 🔥 IMPORTANT
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}