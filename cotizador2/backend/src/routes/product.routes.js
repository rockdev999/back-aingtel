import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  fileUpload,
  getProduct,
  getProducts,
} from "../controllers/product.controllers.js";

export const productRouter = Router();

productRouter.get("/products", getProducts);
productRouter.post("/products", fileUpload, createProduct);
productRouter.get("/products/:code", getProduct);
productRouter.delete("/products/:code", deleteProduct);
