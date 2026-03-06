
import pool from "../db.js";
import { uploadProductImage } from "./imageController.js";


//upload singe image variant
export async function uploadVariantImage(req, res) {
  try {
    const { variantId } = req.body;

    if (!variantId) {
      return res.status(400).json({ error: "variantId is required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // cdn image upload
    const imageUrl = await uploadProductImage(req.file);

    // save in mysql
    await pool.query(
      "INSERT INTO variant_images (variant_id, image_url) VALUES (?, ?)",
      [variantId, imageUrl]
    );

    res.json({
      message: "Variant image uploaded successfully",
      imageUrl
    });

  } catch (error) {
    
    res.status(500).json({ error: "Upload failed" });
  }
}

// multiple variant images 
export async function uploadVariantImages(req, res) {
  try {
    const { variantId } = req.body;

    if (!variantId) {
      return res.status(400).json({ error: "variantId is required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Images are required" });
    }

    const uploadedUrls = [];

    // uploading each image
    for (const file of req.files) {
      const imageUrl = await uploadProductImage(file);

      await pool.query(
        "INSERT INTO variant_images (variant_id, image_url) VALUES (?, ?)",
        [variantId, imageUrl]
      );

      uploadedUrls.push(imageUrl);
    }

    res.json({
      message: "Variant images uploaded successfully",
      images: uploadedUrls
    });

  } catch (error) {
    
    res.status(500).json({ error: "Upload failed" });
  }
}


//  get variant by products and return cdn urls
export async function getVariantsByProduct(req, res) {
  try {
    const { productId } = req.params;

    // getting variants
    const [variants] = await pool.query(
      "SELECT id, size, color, price FROM variants WHERE product_id = ?",
      [productId]
    );

    // adding cdn images to each variant
    for (let variant of variants) {
      const [images] = await pool.query(
        "SELECT image_url FROM variant_images WHERE variant_id = ?",
        [variant.id]
      );

      variant.images = images.map(img => img.image_url);
    }

    res.json(variants);

  } catch (error) {
    
    res.status(500).json({ error: "Server error" });
  }
}