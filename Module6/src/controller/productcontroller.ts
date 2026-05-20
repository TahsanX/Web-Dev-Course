import { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/productservice";
import type { Iproduct } from "../types/producttype";
import { parseBody, sendResponse } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const products = readProduct();
  const urlParts = url?.split("/");

  const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  // ১. GET All Products
  if (url === "/products" && method === "GET") {
    try {
      const products = readProduct();
      return sendResponse(
        res,
        200,
        true,
        "Products retrieved successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  } 
  
  // ২. GET Single Product by ID
  else if (id !== null && method === "GET") {
    try {
      const products = readProduct();
      const product = products.find((p: Iproduct) => p.id === id);
      if (!product) {
        return sendResponse(res, 404, false, "Product not found");
      }
      return sendResponse(
        res,
        200,
        true,
        "Product retrieved successfully",
        product, 
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  } 
  
  // ৩. POST - Create Product
  else if (method == "POST" && url === "/products") {
    try {
      let body = await parseBody(req);
      body = JSON.parse(body);
      
      const newProduct = {
        id: Date.now(),
        ...body,
      };
      
      products.push(newProduct);
      insertProduct(products);

      return sendResponse(
        res,
        201,
        true,
        "Product created successfully",
        newProduct,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Failed to create product", error);
    }
  } 
  
  // ৪. PUT - Update Product
  else if (method == "PUT" && id !== null) {
    try {
      const rawBody = await parseBody(req);
      const parsedBody = JSON.parse(rawBody);
      const products = readProduct();
      const idx = products.findIndex((p: Iproduct) => p.id === id);
      
      if (idx < 0) {
        return sendResponse(res, 404, false, "Product not found");
      }

      products[idx] = {
        id: products[idx].id,
        ...parsedBody,
      };
      insertProduct(products);

      return sendResponse(
        res,
        200,
        true,
        "Product updated successfully",
        products[idx],
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Failed to update product", error);
    }
  } 
  
  // ৫. DELETE - Remove Product
  else if (method === "DELETE" && id !== null) {
    try {
      const products = readProduct();
      const idx = products.findIndex((p: Iproduct) => p.id === id);
      
      if (idx < 0) {
        return sendResponse(res, 404, false, "Product not found");
      }

      const deletedProduct = products.splice(idx, 1)[0];
      insertProduct(products);

      return sendResponse(
        res,
        200,
        true,
        "Product deleted successfully",
        deletedProduct, // ডিলিট হওয়া প্রোডাক্টটি ডেটা হিসেবে ফেরত পাঠানো হলো
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Failed to delete product", error);
    }
  }
};