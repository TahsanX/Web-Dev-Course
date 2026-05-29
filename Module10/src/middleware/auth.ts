import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { pool } from "../DB/index";

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      var token = req.headers.authorization;
      if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access",
        });
      }
      token = token.split(" ")[1];
      
      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(
          token as string,
          process.env.JWT_ACCESS_SECRET as string,
        ) as JwtPayload;
      } catch (tokenError: any) {
        return res.status(401).json({
          success: false,
          message: "Invalid or Expired Token",
          error: tokenError.message,
        });
      }

      try {
        const userData = await pool.query(
          `SELECT * FROM users WHERE email=$1`,
          [decoded.email],
        );

        if (userData.rows.length === 0) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: "User not found!"
          });
        }

        const user = userData.rows[0];

        req.user = user;
        return next();
      } catch (err: any) {
        console.error("Database query error:", err.message);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: err.message,
        });
      }
    } catch (error: any) {
      console.error("Auth middleware error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};
