import { type Response,type Request, application } from "express"
import express, {type Application} from "express"
import { config } from "./config/index"
import CookieParser from "cookie-parser"
import cors from "cors"
import { initDB } from "./DB"
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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(config.port, async () => {
    await initDB()
  console.log(`Example app listening on port ${config.port}`)
})