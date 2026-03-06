import pool from "../db.js";

async function clearTables() {
  await pool.query("SET FOREIGN_KEY_CHECKS = 0");

  await pool.query("DELETE FROM product_attributes");
  await pool.query("DELETE FROM attribute_values");
  await pool.query("DELETE FROM attributes");
  await pool.query("DELETE FROM products");
  await pool.query("DELETE FROM categories");

  await pool.query("SET FOREIGN_KEY_CHECKS = 1");

  console.log(" Tables cleared");
}


async function seedCategories() {
  const categories = ["Clothing", "Electronics", "Beauty"];

  for (let name of categories) {
    await pool.query(
      "INSERT INTO categories (name) VALUES (?)",
      [name]
    );
  }

  console.log(" Categories seeded");
}


async function seedAttributes() {
  const attributes = ["Color", "Size", "Brand", "RAM"];

  for (let name of attributes) {
    await pool.query(
      "INSERT INTO attributes (name) VALUES (?)",
      [name]
    );
  }

  console.log(" Attributes seeded");
}



async function getAttributeId(name) {
  const [rows] = await pool.query(
    "SELECT id FROM attributes WHERE name = ? LIMIT 1",
    [name]
  );
  return rows[0]?.id;
}


async function seedAttributeValues() {
  const colorId = await getAttributeId("Color");
  const sizeId = await getAttributeId("Size");

  const values = [
    { attribute_id: colorId, value: "Red" },
    { attribute_id: colorId, value: "Blue" },
    { attribute_id: sizeId, value: "S" },
    { attribute_id: sizeId, value: "M" },
    { attribute_id: sizeId, value: "L" }
  ];

  for (let v of values) {
    await pool.query(
      "INSERT INTO attribute_values (attribute_id, value) VALUES (?, ?)",
      [v.attribute_id, v.value]
    );
  }

  console.log("Attribute values seeded");
}



async function getCategoryId(name) {
  const [rows] = await pool.query(
    "SELECT id FROM categories WHERE name = ? LIMIT 1",
    [name]
  );
  return rows[0]?.id;
}


async function seedProducts() {
  const clothingId = await getCategoryId("Clothing");
  const electronicsId = await getCategoryId("Electronics");

  const products = [
    { name: "Red T-Shirt", price: 499, category_id: clothingId },
    { name: "Blue Jeans", price: 999, category_id: clothingId },
    { name: "Smartphone", price: 15000, category_id: electronicsId }
  ];

  for (let p of products) {
    await pool.query(
      "INSERT INTO products (title, price, category_id) VALUES (?, ?, ?)",
      [p.name, p.price, p.category_id]
    );
  }

  console.log("Products seeded");
}



async function runSeed() {
  try {
    await clearTables();
    await seedCategories();
    await seedAttributes();
    await seedAttributeValues();
    await seedProducts();

    console.log(" Seed data inserted successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

runSeed();