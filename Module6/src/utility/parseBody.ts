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