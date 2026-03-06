import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "../db.js";


const port = process.env.PORT;


(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    connection.release();

  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
  }
})();

