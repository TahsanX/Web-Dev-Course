import type { Request, Response } from "express"
import express, { type Application } from "express"
import {Pool} from "pg"
const app : Application = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true})) // jeno nested data gulo o naye
const port : number = 3000

const pool = new Pool({connectionString: "postgresql://neondb_owner:npg_t8FKdvWOln2o@ep-plain-wildflower-apnu5ccy.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require"})
app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})
app.post("/",async(req : Request, res : Response)=>{
    const body = req.body
    res.status(201).json({
        message : "Created",
        data: body
    })
})
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})