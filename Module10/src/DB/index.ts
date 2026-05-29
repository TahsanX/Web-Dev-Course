import { Pool } from "pg";
import { config } from "../config/index";

export const pool = new Pool({
  host: config.pg_host,
  port: Number(config.pg_port) || 5432,
  user: config.pg_user,
  password: config.pg_password,
  database: config.pg_database,
});

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,                
        email VARCHAR(255) UNIQUE NOT NULL, 
        password TEXT NOT NULL,    
        role VARCHAR(20) NOT NULL DEFAULT 'contributor'
    CHECK (role IN ('contributor', 'maintainer')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(
      `CREATE TABLE IF NOT EXISTS issues(
      id SERIAL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,  
      description TEXT NOT NULL,  
      type VARCHAR(20) NOT NULL CHECK (type IN ('bug', 'feature_request')),
      status VARCHAR(20) NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress','resolved')),
      reporter_id INT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )`,
    );
    console.log("Database Connected & Table Created Successfully");
  } catch (error: any) {
    console.error(
      "Database connection or creation error:",
      error.message as string,
    );
  }
};
