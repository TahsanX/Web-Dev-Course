import { Router } from "express";
import { signupController } from "./auth.controller";
const router = Router();
router.post("/signup", signupController);
//router.post("/login", (req: Request, res: Response) => {});
export const authRoute = router;
