import { Router } from "express";
import { loginUser, signupController } from "./auth.controller";
const router = Router();
router.post("/signup", signupController);
router.post("/login", loginUser);
export const authRoute = router;
