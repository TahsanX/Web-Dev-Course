import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
export const pool = new Pool({
  connectionString: process.env.CONNECTIONSTRING,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 15000,
  idleTimeoutMillis: 30000,
});

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),                
        email VARCHAR(255) UNIQUE NOT NULL, 
        password TEXT NOT NULL,    
        is_active BOOLEAN DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(
      `CREATE TABLE IF NOT EXISTS profiles(
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      bio TEXT,
      address TEXT,
      phone VARCHAR(15),
      gender VARCHAR(10),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )`,
    );
    console.log("Database Connected & Table Created Successfully");
  } catch (error) {
    console.error("Database connection or creation error:", error);
  }
};
