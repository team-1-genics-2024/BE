import express from "express";
import { userController } from "../controller/userController";

export const userRouter = express.Router();

userRouter.post("/", userController.create);
userRouter.get("/", userController.findAll);
