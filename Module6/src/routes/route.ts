import type {IncomingMessage, ServerResponse} from "http"
import { productController } from "../controller/productcontroller"

export const routeHandler = (req: IncomingMessage, res: ServerResponse)=>{
    const url = req.url
    const method = req.method
    if (url=== "/" && method === "GET") {
        res.writeHead(200,{"content-type":"application/json"})
        res.end(JSON.stringify({message: "This is root"}))
    }
    else if (url?.startsWith('/products') && method === "GET" || method === "POST" || method === "PUT" || method === "DELETE") {
        productController(req,res)
    }
    else{
        res.writeHead(404,{"content-type":"application/json"})
        res.end(JSON.stringify({message: "Route not found"}))
    }
}