import { Router } from "express";
import { UserController } from "../controller/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { RateLimiter } from "../middleware/RateLimiter";

export const userRouter = Router();

userRouter.post("/register", RateLimiter.registerLimiter, UserController.register);
userRouter.get("/", RateLimiter.getUserLimiter, AuthMiddleware, UserController.get);


