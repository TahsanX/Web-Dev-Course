import type { NextFunction, Request, Response } from "express";
import express, { type Application } from "express";
import dotenv from "dotenv"
import CookieParser from "cookie-parser"
import cors from "cors"
import { userRoute } from "../src/modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import { logger } from "./middleware/logger";
import { Globalerrorhandler } from "./middleware/globalerrorhandler";
dotenv.config();
const app: Application = express();
app.use(CookieParser())
app.use(express.json());
app.use(express.text());
const corsOptions = {
  origin: `http://localhost:${process.env.PORT}.com`,
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/api/users',userRoute)
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);
app.use(Globalerrorhandler);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});



export default app