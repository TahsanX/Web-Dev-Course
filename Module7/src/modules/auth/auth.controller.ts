import type { Request, Response } from "express";
import { loginUserIntoDB } from "./auth.service";
import { generateFreshToken } from "./auth.service";
const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await loginUserIntoDB(req.body);

    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false, // In production => True
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "User login successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await generateFreshToken(
      req.cookies.refreshToken,
    );
    res.status(200).json({
      success: true,
      message: "Acess token generated!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
export const authController = {
  loginUser,
  refreshToken
};