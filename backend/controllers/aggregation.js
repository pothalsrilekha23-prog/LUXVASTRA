import pool from "../db.js";
import express from "express";
const reviewrouter = express.Router();
export const approveReview = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const reviewId = req.params.reviewId;

    //  Approve review
    await connection.query(
      `UPDATE reviews SET status='approved' WHERE id=?`,
      [reviewId]
    );

    //  Get product_id of that review
    const [review] = await connection.query(
      `SELECT product_id FROM reviews WHERE id=?`,
      [reviewId]
    );

    const productId = review[0].product_id;

    // Aggregate approved reviews
    const [aggregation] = await connection.query(
      `SELECT COUNT(*) as total_reviews,
              AVG(rating) as avg_rating
       FROM reviews
       WHERE product_id=? AND status='approved'`,
      [productId]
    );

    const { total_reviews, avg_rating } = aggregation[0];

    // Update products table
    await connection.query(
      `UPDATE products 
       SET avg_rating=?, review_count=? 
       WHERE id=?`,
      [avg_rating, total_reviews, productId]
    );

    await connection.commit();
    connection.release();

    res.json({ message: "Review approved & product rating updated" });

  } catch (error) {
    await connection.rollback();
    connection.release();
    res.status(500).json({ message: "Server Error" });
  }
};