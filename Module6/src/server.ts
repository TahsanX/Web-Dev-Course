import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import { routeHandler } from "./routes/route";
import config from "./config";

const server: Server = createServer((req: IncomingMessage,res: ServerResponse)=>{
    //console.log(req.url) // "/user", "/product"
    //console.log(req.method)// GET, PUT, POST
    routeHandler(req,res);
    
})
server.listen(config.port,()=>{
    console.log(`Server is running on port ${config.port}`)
})