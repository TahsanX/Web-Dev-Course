import { Router } from "express";
import type { Request,Response } from "express";
const router = Router();
router.get("/login",(req:Request,res:Response)=>{
    res.send(`${req.url} && ${req.method}`)
})
router.get("/signup",(req:Request,res:Response)=>{
    res.send(`${req.url} && ${req.method}`)
})
export const authRoute = router