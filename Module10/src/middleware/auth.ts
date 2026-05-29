import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../DB/index";
import { errorResponse } from "../utils/responseHandler";

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      var token = req.headers.authorization;
      if (!token || !token.startsWith("Bearer ")) {
        return errorResponse(res, 401, "Unauthorized Access", "Unauthorized Access");
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
          return errorResponse(res, 401, "Unauthorized", "User not found!");
        }

        const user = userData.rows[0];

        req.user = user
        return next();
      } catch (err: any) {
        return errorResponse(res, 500, "Internal Server Error", err.message);
      }
    } catch (error: any) {
      return errorResponse(res, 401, "Unauthorized: Invalid or expired token", error.message);
    }
  };
};