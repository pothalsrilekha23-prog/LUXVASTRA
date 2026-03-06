import express from "express";
import pool from "./db.js";
import { getSellerRating } from "./service/ratingService.js";

const trustBadgeRoutes= express.Router();

trustBadgeRoutes.get("/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;

    const ratingData = await getSellerRating(sellerId);
    const rating = ratingData.rating;
    const [rows] = await pool.query(
      `SELECT is_verified
       FROM sellers
       WHERE id = ?`,
      [sellerId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Seller not found" });
    }

    const seller = rows[0];
    const badges = [];

    if (rating > 4.7) {
      badges.push("Top Seller");
    }

    if (rating >= 4.0) {
      badges.push("Trusted Seller");
    }

    if (seller.is_verified) {
      badges.push("Verified Seller");
    }

    res.json({
      sellerId,
      rating,
      badges
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default trustBadgeRoutes;


// api = GET /api/trust-badges/:sellerId