import express, {type Application} from "express"
import { config } from "./config/index"
import CookieParser from "cookie-parser"
import cors from "cors"
import { initDB } from "./DB"
import { authRoute } from "./modules/auth/auth.route"
import { issueRoute } from "./modules/issue/issue.route"
import { logger } from "./middleware/logger"
import { Globalerrorhandler } from "./middleware/globalerrorhandler"
const app: Application = express()
app.use(CookieParser())
app.use(express.json());
app.use(express.text());
const corsOptions = {
  origin: `http://localhost:${config.port}.com`,
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/api/auth',authRoute)
app.use('/api/issues',issueRoute)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: `${req.originalUrl} does not exist`,
  });
});
app.use(Globalerrorhandler)
export default app