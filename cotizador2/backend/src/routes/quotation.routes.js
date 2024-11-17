import { Router } from "express";
import {
  createQuotation,
  getQuotation,
} from "../controllers/quotation.controllers.js";

export const QuotationRoute = Router();

QuotationRoute.get("/quotations", getQuotation);
QuotationRoute.post("/quotations", createQuotation);
