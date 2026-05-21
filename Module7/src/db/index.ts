import { Pool } from "pg";
import dotenv from "dotenv"
dotenv.config();
export const pool = new Pool({
    connectionString:
    process.env.CONNECTIONSTRING,
});

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),                
        email VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL,    
        is_active BOOLEAN DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Database Connected & Table Created Successfully");
  } catch (error) {
    console.error("Database connection or creation error:", error);
  }
};