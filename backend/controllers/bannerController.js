
import pool from "../db.js";

//import redis from "../config/redis.js";
import { cacheBanners } from "../middlewares/cacheBanners.js";
//import { protectAdmin } from "../middlewares/auth.js";


 // create banner
 
export const createBanner = async (req, res) => {
  try {
    const { title, image_url, link, is_active} = req.body;

    if (!title || !image_url) {
      return res.status(400).json({ message: "Title and image are required" });
    }

    const query = `
      INSERT INTO banners (title, image_url, link, is_active)
      VALUES (?, ?, ?, ?)
    `;

    // await redis.del("banners"); // clear cach

    const [result] = await pool.query(query, [
      title,
      image_url,
      link || null,
      is_active ?? 0,
    ]);

    res.status(201).json({
      message: "Banner created successfully",
      banner_id: result.insertId,
    });
  } catch (error) {
    
    res.status(500).json({ message: "Server error" });
  }
};

// to get all banners

export const getAllBanners = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM banners ORDER BY created_at DESC"
    );

    res.json(rows);
  } catch (error) {
   
    res.status(500).json({ message: "Server error" });
  }
};

 // to  get single banner
 
export const getBannerById = async (req, res) => {
  try {
    const {id} = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM banners WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    
    res.status(500).json({ message: "Server error" });
  }
};

 // to update banner

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image_url, link, status } = req.body;

    const query = `
      UPDATE banners
      SET title = ?, image_url = ?, link = ?, status = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(query, [
      title,
      image_url,
      link,
      status,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.json({ message: "Banner updated successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "Server error" });
  }
};


 // to delete banner

export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id ) {
      return res.status(400).json({
        success: false,
        message: "Valid banner ID is required"
      });
    }

    const [result] = await pool.query(
      "DELETE FROM banners WHERE id = ?",[id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "Server error" });
  }
};