
// import pool from "../db.js";

// export const getAllProducts = async (filters) => {
//   let query = `
//     SELECT id, name, price, brand, rating
//     FROM products
//     WHERE 1=1
//   `;

//   const values = [];

//   // Keyword search (FULLTEXT)
//   if (filters.keyword) {
//     query += `
//       AND MATCH(name, description)
//       AGAINST(? IN NATURAL LANGUAGE MODE)
//     `;
//     values.push(filters.keyword);
//   }

//   // Category filter
//   if (filters.category) {
//     query += ` AND category_id = ?`;
//     values.push(filters.category);
//   }

//   // Price range filter
//   if (filters.minPrice) {
//     query += ` AND price >= ?`;
//     values.push(Number(filters.minPrice));
//   }

//   if (filters.maxPrice) {
//     query += ` AND price <= ?`;
//     values.push(Number(filters.maxPrice));
//   }

//   //Safe sorting (prevents SQL injection)
//   const allowedSortFields = ["created_at", "price", "rating"];
//   const sortField = allowedSortFields.includes(filters.sortBy)
//     ? filters.sortBy
//     : "created_at";

//   query += ` ORDER BY ${sortField} DESC`;

//   // Pagination
//   const limit = Number(filters.limit) || 10;
//   const page = Number(filters.page) || 1;

//   query += ` LIMIT ? OFFSET ?`;
//   values.push(limit, (page - 1) * limit);

//   // Execute query
//   const [rows] = await pool.query(query, values);
//   return rows;

// }

// // To Get Single Product
// export const getProductById=async(id)=>{
//     const [row]=pool.query("SELECT * FROM products WHERE id=?",[id]);

//     return row[0];
// };


// // To Create Product
// export const createNewProduct=async(data)=>{

// const {title,price,original_price,discount_percent,stock,description}=data;
//     const[result]=await pool.query(`INSERT INTO products 
//         (title, price, original_price, discount_percent, stock, description)  
//         VALUES(?,?,?,?,?,?)`,
//         [title,price,original_price,discount_percent,stock,description]
//     );

//     return result.insertId;

// };

// // Update the product
//   export const updateProduct=async(id,data) => {
//     const {title,price,original_price,discount_percent,stock,description}=data;
//     const[result]=pool.query(`UPDATE  products SET 
//         (title, price, original_price, discount_percent, stock, description)  
//         VALUES(?,?,?,?,?,?) WHERE id=?` ,
//         [title,price,original_price,discount_percent,stock,description,id]
//     );
// };

// // Delete the product

// export const deleteProduct=async(id)=>{
//     await pool.query("DELETE FROM products WHERE id=?",[id]);
// };


import pool from "../db.js";
import slugify from "slugify";

const generateSlug = (text) => {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true
  });
};

export const getAllProducts = async (filters) => {
  let query = `
    SELECT id, title, price, brand_id, rating, slug
    FROM products
    WHERE 1=1
  `;

  const values = [];

  // Keyword search (FULLTEXT)
  if (filters.keyword) {
    query += `
      AND MATCH(title, description)
      AGAINST(? IN NATURAL LANGUAGE MODE)
    `;
    values.push(filters.keyword);
  }

  // Category filter
  if (filters.category) {
    query += ` AND category_id = ?`;
    values.push(filters.category);
  }

  // Price range filter
  if (filters.minPrice) {
    query += ` AND price >= ?`;
    values.push(Number(filters.minPrice));
  }

  if (filters.maxPrice) {
    query += ` AND price <= ?`;
    values.push(Number(filters.maxPrice));
  }

  //Safe sorting (prevents SQL injection)
 const allowedSortFields = ["id", "price", "rating"];
const sortField = allowedSortFields.includes(filters.sortBy)
  ? filters.sortBy
  : "id";

query += ` ORDER BY ${sortField} DESC`;

  // Pagination
  const limit = Number(filters.limit) || 10;
  const page = Number(filters.page) || 1;

  query += ` LIMIT ? OFFSET ?`;
  values.push(limit, (page - 1) * limit);

  // Execute query
  const [rows] = await pool.query(query, values);
  return rows;

}

// To Get Single Product
export const getProductById=async(id)=>{
    const [row]=await pool.query("SELECT * FROM products WHERE id=?",[id]);

    return row[0];
};

const getProductBySlug = async (slug) => {
  const [rows] = await pool.query(
    "SELECT id FROM products WHERE slug = ?",
    [slug]
  );
  return rows[0];
};

export const getProductBySlugService = async (slug) => {
  const [rows] = await pool.query(
    "SELECT * FROM products WHERE slug = ?",
    [slug]
  );
  return rows[0];
};

// To Create Product

export const createNewProduct = async (data) => {

  const { title, price, original_price, discount_percent, stock, description } = data;

  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;

  // Ensure slug uniqueness
  while (await getProductBySlug(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const [result] = await pool.query(
    `INSERT INTO products 
    (title, price, original_price, discount_percent, stock, description, slug)  
    VALUES(?,?,?,?,?,?,?)`,
    [title, price, original_price, discount_percent, stock, description, slug]
  );

  return result.insertId;
};

// Update the product
  export const updateProduct=async(id,data) => {
    const {title,price,original_price,discount_percent,stock,description}=data;
    const[result]=pool.query(`UPDATE  products SET 
        (title, price, original_price, discount_percent, stock, description)  
        VALUES(?,?,?,?,?,?) WHERE id=?` ,
        [title,price,original_price,discount_percent,stock,description,id]
    );
};

// Delete the product

export const deleteProduct=async(id)=>{
    await pool.query("DELETE FROM products WHERE id=?",[id]);
};