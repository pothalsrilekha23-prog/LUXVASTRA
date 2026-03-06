import pool from "../db.js";
import { applyRules } from "../service/rulesEngine.js";

//-------------- get buy box by product -------------------

export const getBuyBoxWinner = async (req, res) => {
  try {
    const { productId } = req.params.productId;

    const [rows] = await pool.query(
      `
      SELECT 
        ps.id AS product_seller_Id,
        ps.selling_price,
        ps.stock,
        ps.shipping_days,
        s.id AS seller_id,
        s.store_name,
        s.rating
      FROM product_sellers ps
      JOIN sellers s ON ps.seller_id = s.id
      WHERE 
        ps.product_id = ?
        AND ps.stock > 0
        AND ps.status = 'Active'
        AND s.account_status = 'Active'
      ORDER BY 
        ps.selling_price ASC,
        s.rating DESC,
        ps.shipping_days ASC

      LIMIT 1
      `,
      [productId]
    );

    if (!rows.length) {
      return res.json({
        message: "No seller available for Buy Box",
        winner: null
      });
    }

    res.json({
      message: "Buy Box winner selected",
      winner: rows[0]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
