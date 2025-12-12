require("dotenv").config();
const mysql = require("mysql2/promise");

async function createUsersTable() {
  let connection;

  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("✅ Connected to MySQL database");

    // Create users table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        mobile_number VARCHAR(20) NOT NULL,
        address VARCHAR(255) NOT NULL,
        address2 VARCHAR(255) DEFAULT NULL,
        city VARCHAR(100) NOT NULL,
        province VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_username (username)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await connection.execute(createTableQuery);
    console.log("✅ Users table created successfully");

    // Verify table structure
    const [rows] = await connection.execute("DESCRIBE users");
    console.log("\n📋 Users table structure:");
    console.table(rows);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log("\n✅ Database connection closed");
    }
  }
}

createUsersTable();
