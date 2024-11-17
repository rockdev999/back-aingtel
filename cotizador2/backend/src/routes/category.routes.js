import { Router } from "express";
import { getCategories } from "../controllers/category.controllers.js";
export const categoryRoute = Router();

categoryRoute.get("/categories", getCategories);
