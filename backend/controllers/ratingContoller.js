import { addRating, getSellerRating } from "../service/ratingService.js";

export async function addRatingController(req, res) {
  try {
    const { sellerId, userId, rating, comment } = req.body;

    if (!sellerId || !userId || !rating) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: "Rating must be between 1 and 5"
      });
    }

    const result = await addRating({ sellerId, userId, rating, comment });

    res.json({
      message: "Rating added",
      data: result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getRatingController(req, res) {
  try {
    const { sellerId } = req.params;

    const rating = await getSellerRating(sellerId);

    res.json(rating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}