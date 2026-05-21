import type { Request, Response } from "express";
import express, { type Application } from "express";
import dotenv from "dotenv"
import { initDB } from "./db";
import { pool } from "./db";
dotenv.config();
const app: Application = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.body;
    const result = await pool.query(
      `
    INSERT INTO users(name, email, password, age)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
      [name, email, password, age],
    );
    res.status(201).json({
      message: "Created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users
      `);
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/api/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      `
      SELECT FROM users WHERE id=$1
      `,
      [id],
    );
    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
app.put("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    
    const name = req.body.name ?? null;
    const password = req.body.password ?? null;
    const age = req.body.age ?? null;
    const is_active = req.body.is_active ?? null;

    const result = await pool.query(
      `
      UPDATE users 
      SET 
        name = COALESCE($1, name),
        password = COALESCE($2, password),
        age = COALESCE($3, age),
        is_active = COALESCE($4, is_active),
        updated_at = NOW()
        WHERE id = $5 
        RETURNING *;
      `,
      [name, password, age, is_active, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ 
        success: false,
        message: "User not found",
      });
      return; 
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
    DELETE FROM users WHERE id=$1  
      `,
      [id],
    );

    console.log(result);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

export default app