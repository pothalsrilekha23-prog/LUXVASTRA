import pool from "../db.js";

export const generateSitemap = async (req, res) => {
  try {
    const [products] = await pool.query(
      "SELECT slug FROM products WHERE status='active'"
    );

    const urls = products
      .map(
        (p) => `
        <url>
          <loc>http://localhost:4000/products/${p.slug}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`
      )
      .join("");

    res.header("Content-Type", "application/xml");

    res.send(`
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
      </urlset>
    `);
  } catch (error) {
   
    res.status(500).send("Error generating sitemap");
  }
};