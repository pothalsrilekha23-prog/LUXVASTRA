import mysql from "mysql2/promise";
import "dotenv/config";

const pool=mysql.createPool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,

     waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

})
try {
    const connection= await pool.getConnection();
    console.log("Db Connection Success");
    connection.release();
}catch (error) {
  console.error("MySQL connection failed:");
}

export default pool;




