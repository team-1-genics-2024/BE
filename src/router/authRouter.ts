import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/refresh", AuthController.refreshToken);


