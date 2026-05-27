import type { Request, Response } from "express";
import express, { type Application } from "express";
import dotenv from "dotenv"
import { userRoute } from "../src/modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import { logger } from "./middleware/logger";
dotenv.config();
const app: Application = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use('/api/users',userRoute)
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});



export default app