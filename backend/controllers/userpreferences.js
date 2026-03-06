import express from "express";
import "dotenv/config";
import pool from "../db.js";
const db = pool;

/* ===============================
   GET USER PREFERENCES
=================================*/
const getUserPreferences = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT * FROM user_preferences WHERE user_id = ?`,
      [userId]
    );

    res.json(rows[0] || {});
  } catch (error) {

    res.status(500).json({ message: "Failed to fetch preferences" });
  }
};

/* ===============================
   UPDATE LOCATION
=================================*/
const updateLocation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { pincode } = req.body;

    await db.query(
      `INSERT INTO user_preferences (user_id, location_pincode)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE location_pincode = VALUES(location_pincode)`,
      [userId, pincode]
    );

    res.json({ message: "Location updated successfully" });
  } catch (error) {
  
    res.status(500).json({ message: "Failed to update location" });
  }
};

/* ===============================
   UPDATE FULL PREFERENCES
=================================*/
const updateUserPreferences = async (req, res) => {
  try {
    const userId = req.params.id;

    const {
      preferred_categories,
      preferred_brands,
      price_range,
      notification_preferences
    } = req.body;

    await db.query(
      `INSERT INTO user_preferences 
        (user_id, preferred_categories, preferred_brands, price_range, notification_preferences)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         preferred_categories = VALUES(preferred_categories),
         preferred_brands = VALUES(preferred_brands),
         price_range = VALUES(price_range),
         notification_preferences = VALUES(notification_preferences)`,
      [
        userId,
        preferred_categories,
        preferred_brands,
        price_range,
        notification_preferences
      ]
    );

    res.json({ message: "Preferences updated successfully" });

  } catch (error) {
    
    res.status(500).json({ message: "Failed to update preferences" });
  }
};

/* ===============================
   ADD RECENTLY VIEWED
=================================*/
const addRecentlyViewed = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    await db.query(
      `INSERT INTO user_recently_viewed (user_id, product_id)
       VALUES (?, ?)`,
      [userId, productId]
    );

    res.json({ message: "Recently viewed updated" });

  } catch (error) {
   
    res.status(500).json({ message: "Failed to update recently viewed" });
  }
};

/* ===============================
   ADD TO WISHLIST
=================================*/
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    await db.query(
      `INSERT IGNORE INTO user_wishlist (user_id, product_id)
       VALUES (?, ?)`,
      [userId, productId]
    );

    res.json({ message: "Product added to wishlist" });

  } catch (error) {
    
    res.status(500).json({ message: "Failed to add wishlist item" });
  }
};

/* ===============================
   SAVE SEARCH TERM
=================================*/
const saveSearchTerm = async (req, res) => {
  try {
    const userId = req.user.id;
    const { term } = req.body;

    await db.query(
      `INSERT INTO user_search_history (user_id, search_term)
       VALUES (?, ?)`,
      [userId, term]
    );

    res.json({ message: "Search term saved" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save search term" });
  }
};

export {
  getUserPreferences,
  updateLocation,
  updateUserPreferences,
  addRecentlyViewed,
  addToWishlist,
  saveSearchTerm
};