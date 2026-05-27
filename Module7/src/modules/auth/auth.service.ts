import bcrypt from "bcryptjs";
import { pool } from "./../../db/index";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
export const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  // 1. Check if the user exists -> Done
  // 2. Compare the password -> Done
  //3. Generate Token -> Done

  // 1. Check if the user exists
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );
  if (userData.rows.length === 0) {
    throw new Error("Invalid Credentials!");
  }

  // 2. Compare the password -> Done
  const user = userData.rows[0];
  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid Credentials!");
  }

  //3. Generate Token
  const jwtpayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtpayload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "5m",
  });
  const refreshToken = jwt.sign(jwtpayload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "10d",
  });
  return { accessToken, refreshToken };
};
export const generateFreshToken = async (token: string) => {
  if (!token) {
    throw { status: 401, message: "Unauthorized: No token provided" };
  }

  try {
    // টোকেন ভেরিফাই করা
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    ) as JwtPayload;

    // ডাটাবেজ থেকে ইউজার চেক
    const userData = await pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [decoded.email]
    );

    const user = userData.rows[0];

    if (userData.rows.length === 0) {
      throw { status: 404, message: "User not found!!" };
    }

    if (!user?.is_active) {
      throw { status: 403, message: "Forbidden: User is inactive!!" };
    }

    // নতুন অ্যাক্সেস টোকেন তৈরি
    const jwtpayload = {
      id: user.id,
      name: user.name,
      role: user.role,
      is_active: user.is_active,
      email: user.email,
    };

    const accessToken = jwt.sign(
      jwtpayload, 
      process.env.JWT_ACCESS_SECRET as string, 
      { expiresIn: "5m" }
    );

    return { accessToken };

  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw { status: 401, message: "Refresh token expired. Please login again." };
    }
    if (error.name === "JsonWebTokenError") {
      throw { status: 401, message: "Invalid refresh token." };
    }
    
    throw error;
  }
};