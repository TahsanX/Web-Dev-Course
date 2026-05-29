import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../DB/index";

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      var token = req.headers.authorization;
      if (!token || !token.startsWith("Bearer ")) {
        return res.status(404).json({
          success: false,
          message: "Unauthoraized Access",
        });
      }
      token = token.split(" ")[1];
      const decoded = jwt.verify(
        token as string,
        process.env.JWT_ACCESS_SECRET as string,
      ) as JwtPayload;
      try {
        const userData = await pool.query(
          `SELECT * FROM users WHERE email=$1`,
          [decoded.email],
        );

        if (userData.rows.length === 0) {
          return res.status(404).json({
            success: false,
            message: "Unauthorized",
            error: "User not found!"
          });
        }

        const user = userData.rows[0];

        (req as any).user = user;
        next();
      } catch (err: any) {
        console.error("Database query error:", err.message);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: err.message,
        });
      }
    } catch (error: any) {
      console.error("JWT Verification Error:", error.message);

      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or expired token",
        error: error.message,
      });
    }
  };
};
