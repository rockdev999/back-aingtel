import { Router } from "express";
import {
  getDealers,
  createDealer,
  getDealer,
  deleteDealer,
} from "../controllers/dealer.controllers.js";
export const dealerRoute = Router();

dealerRoute.get("/dealers", getDealers);
dealerRoute.post("/dealers", createDealer);
dealerRoute.get("/dealers/:email", getDealer);
dealerRoute.delete("/dealers/:ci", deleteDealer);
