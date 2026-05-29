import type { Request, Response } from "express";
import type { Ilogin, Isignup } from "./auth.interface.js";
import { createUserService, loginUserIntoDB } from "./auth.service.js";

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
export const loginUser = async (req: Request, res: Response) => {
  const payload: Ilogin = req.body;
  const { email, password } = payload;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: "Email and password are required for login"
    });
  }
  try {
    const result = await loginUserIntoDB(payload);

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        errors: result.message
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      data: result.data 
    });

  } catch (error: unknown) {
    console.error("Login System Error:", error);
    
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: "Unexpected system error occurred. Please try again later."
    });
  
};
};
