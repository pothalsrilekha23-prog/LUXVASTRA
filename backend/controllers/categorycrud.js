import pool from "../db.js";

// -------------------------- CREATE CATEGORY  ---------------------------//
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ message: "Category name required" });

    const [exists] = await pool.query(
      "SELECT id FROM categories WHERE name=?",
      [name]
    );

    if (exists.length)
      return res.status(409).json({ message: "Category already exists" });

    await pool.query(
      "INSERT INTO categories (name) VALUES (?)",
      [name]
    );

    res.status(201).json({ message: "Category created successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


//  -------------------------- GET ALL ---------------------------//
export const getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// --------------------------- GET BY ID  ---------------------------//

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE id=?",
      [id]
    );

    if (!rows.length)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json(rows[0]);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// -------------------------- UPDATE  ---------------------------//

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const [result] = await pool.query(
      "UPDATE categories SET name=? WHERE id=?",
      [name, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// -------------------------- DELETE  ---------------------------//

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM categories WHERE id=?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};