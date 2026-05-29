import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import type { Isignup } from "./auth.interface.js";
import { createUserService } from "./auth.service.js";

export const signupController = async (req: Request, res: Response) => {
  const obj: Isignup = req.body;
  const { name, email, password, role = "contributor" }: Isignup = obj;

  if (
    !name || typeof name !== "string" || name.trim().length === 0 ||
    !email || typeof email !== "string" ||
    !password || String(password).trim().length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: "Validation failed: Name, email, and password are required and must be valid."
    });
  }

  try {
    const userResponse = await createUserService({ name, email, password, role });

    return res.status(201).json({
      success: true,
      message: "User Created successfully!",
      data: userResponse,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: "Validation errors or invalid input or duplicate resource",
        errors: error.message 
      });
    } else {
      console.error("Error occurred during saving user: ", String(error));
      return res.status(500).json({
        success: false,
        message: "Unexpected server or database error",
        errors: "Unexpected server or database error"
      });
    }
  }
};
