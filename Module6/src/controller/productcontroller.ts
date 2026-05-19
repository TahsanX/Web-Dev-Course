import {IncomingMessage,ServerResponse} from "http"
import { readProduct } from "../service/productservice"
import type { Iproduct } from "../types/producttype"
import { parseBody } from "../utility/parseBody"
//import {data} from "../database/db.json"
export const productController = async(req:IncomingMessage,res:ServerResponse)=>{
    const url = req.url || "";
    const method = req.method;
    const products = readProduct();
    
    // URL পার্টস বের করা
    const urlParts = url.split("/").filter(Boolean); // খালি অংশগুলো বাদ দেবে
    const route = urlParts[0]; // "products"
    const id = urlParts[1] ? Number(urlParts[1]) : null;
    //console.log(id)
    if (route === "products" && !id && method === "GET") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "All products", Data: { products } }));
    }
    // ২. GET Single Product
    else if (route === "products" && id && method === "GET") {
        const product = products.find((p: Iproduct) => p.prodID === id);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Single product", Data: { product } }));
    }
    // ৩. POST Product
    else if (route === "products" && method === "POST") {
        const body = await parseBody(req);
        console.log("Body received:", body);
        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Product created successfully", receivedData: body }));
    }
    
}