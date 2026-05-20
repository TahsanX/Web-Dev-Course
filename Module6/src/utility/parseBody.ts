import fs from "fs"
import {IncomingMessage,ServerResponse} from "http"
export const parseBody = (req: IncomingMessage): Promise<any>=>{
    // Pending, Resolve, Reject
    return new Promise((resolve,reject)=>{
        let body = ""
        req.on('data',(chunk)=>{
            body+=chunk
        })
        req.on('end',()=>{
            try {
                resolve(body)
            } catch (error) {
                reject(error)
            }
        })
    })
}
export const sendResponse = (res: ServerResponse,statusCode: number, success: boolean, message: string, data?: any)=>{
    const response = {
        success,
        message,
        data
    }
    res.writeHead(statusCode, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        response
      }),
)}