import { Router } from "express";
import type { Request,Response } from "express";
const router = Router();
router.get("/",(req:Request,res:Response)=>{
    res.send(`${req.url} && ${req.method}`)
})
router.get("/:id",(req:Request,res:Response)=>{
    res.send(`${req.url} && ${req.method}`)
})
export const issueRoute = router