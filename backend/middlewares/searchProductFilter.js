import { getAllProducts } from "../service/products";

export const searchProducts = async (req, res) => {
  try {
    const filters = {
      keyword: req.query.keyword,
      category: req.query.category,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      sortBy: req.query.sortBy,
      page: req.query.page,
      limit: req.query.limit
    };

    const products = await getAllProducts(filters);
    res.json(products);

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};