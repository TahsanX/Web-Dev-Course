import type { Request, Response } from "express";
import type { Ilogin, Isignup } from "./auth.interface.js";
import { createUserService, loginUserIntoDB } from "./auth.service.js";
import { successResponse, errorResponse, errorsResponse } from "../../utils/responseHandler";

export const signupController = async (req: Request, res: Response) => {
  const { name, email, password, role = "contributor" }: Isignup = req.body;

  if (
    !name || typeof name !== "string" || name.trim().length === 0 ||
    !email || typeof email !== "string" ||
    !password || String(password).trim().length === 0
  ) {
    return errorsResponse(res, 400, "Validation error", "Validation failed: Name, email, and password are required and must be valid.");
  }

  try {
    const userResponse = await createUserService({ name, email, password, role });
    return successResponse(res, 201, "User registered successfully", userResponse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorsResponse(res, 400, "Validation errors or invalid input or duplicate resource", error.message);
    }
    return errorResponse(res, 500, "Unexpected server or database error", "Unexpected server or database error");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const payload: Ilogin = req.body;
  const { email, password } = payload;

  if (!email || !password) {
    return errorsResponse(res, 400, "Validation Error", "Email and password are required for login");
  }

  try {
    const result = await loginUserIntoDB(payload);

    if (!result.success) {
      return errorResponse(res, 401, "Unauthorized", result.message);
    }

    return successResponse(res, 200, "Login successful", result.data);
  } catch (error: unknown) {
    return errorResponse(res, 500, "Internal Server Error", "Unexpected system error occurred. Please try again later.");
  }
};