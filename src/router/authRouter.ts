import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { GoogleAuthMiddleware } from "../middleware/GoogleAuthMiddleware";

export const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.get("/google", GoogleAuthMiddleware.concern);
authRouter.get("/google/callback", GoogleAuthMiddleware.callback, AuthController.loginWithGoogle);
authRouter.post("/refresh", AuthController.refreshToken);


