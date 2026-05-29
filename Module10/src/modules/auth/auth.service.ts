import { pool } from "../../DB/index.js";
import bcrypt from "bcryptjs";
import type { Ilogin, Isignup } from "./auth.interface.js";
import jwt from "jsonwebtoken";
import { config } from "../../config/index.js";
export const createUserService = async (userData: Isignup) => {
  const { name, email, password, role } = userData;

  const mainpass = String(password);
  const hashPassword = await bcrypt.hash(mainpass, 10);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *`,
    [name, email, hashPassword, role],
  );

  const newUser = result.rows[0];

  const userResponse = { ...newUser };
  delete userResponse.password;

  return userResponse;
};
export const loginUserIntoDB = async (payload: Ilogin) => {
  const { email, password } = payload;
  try {
    const userData = await pool.query(
      `
    SELECT * FROM users WHERE email=$1
    `,
      [email],
    );
    if (userData.rows.length === 0) {
      return {
        success: false,
        message: "Unauthorized",
        error: "Login credentials are not correct",
      };
    }
    const mainpass = String(password)
    const user = userData.rows[0];
    try {
      const matchPassword = await bcrypt.compare(mainpass, user.password);
      if (!matchPassword) {
        return {
          success: false,
          message: "Unauthorized",
          error: "Login credentials are not correct",
        };
      }
      const jwtpayload = {
        id: user.id,
        name: user.name,
        role: user.role,
      };

      const accessToken = jwt.sign(
        jwtpayload,
        config.jwt_access_secret as string,
        {
          expiresIn: "1d",
        },
      );
      return {
        success: true,
        data: { accessToken, user: user },
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Unauthorized",
        error: error.message,
      };
    }
  } catch (error: unknown) {
    return {
      success: false,
      message: "Unexpected server or database error",
      error: "Unexpected server or database error",
    };
  }
};
