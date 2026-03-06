import pool from "../db.js";

export async function addRating({ sellerId, userId, rating, comment }) {
  
  await pool.query(
    `INSERT INTO seller_reviews (seller_id, user_id, rating, comment)
     VALUES (?, ?, ?, ?)`,
    [sellerId, userId, rating, comment]
  );

  
  const [rows] = await pool.query(
    `SELECT AVG(rating) as avgRating, COUNT(*) as total
     FROM seller_reviews
     WHERE seller_id = ?`,
    [sellerId]
  );

  const avgRating = rows[0].avgRating;
  const totalReviews = rows[0].total;
 
  await pool.query(
    `UPDATE sellers
     SET rating = ?, total_reviews = ?
     WHERE id = ?`,
    [avgRating, totalReviews, sellerId]
  );

  return { avgRating, totalReviews };
}

export async function getSellerRating(sellerId) {
  const [rows] = await pool.query(
    `SELECT rating, total_reviews
     FROM sellers
     WHERE id = ?`,
    [sellerId]
  );
   if (rows.length === 0) {
    throw new Error("Seller not found");
  }

   return {
    rating: rows[0].rating,
    totalReviews: rows[0].total_reviews
  };
}