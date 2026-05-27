import type { NextFunction } from "express";
import type { Request, Response } from "express";
import fs from "fs"
export const logger = (req:Request, res: Response, next: NextFunction) => {
  const time = new Date().toLocaleString(); 
  const method = req.method;               
  const url = req.url;  
  const log = `[${time}] ${method} ${url} \n`   
  fs.appendFile('logger.txt',log,(err)=>{
  })       
  next();
}
