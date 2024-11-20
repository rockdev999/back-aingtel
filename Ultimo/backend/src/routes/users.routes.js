import { Router } from "express";
import { getUsers } from "../controllers/user.controllers.js";

export const userRouter = Router();

userRouter.get("/users", getUsers);
