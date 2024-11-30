import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { GoogleAuthMiddleware } from "../middleware/GoogleAuthMiddleware";
import { RateLimiter } from "../middleware/RateLimiter";

export const authRouter = Router();

authRouter.post("/login", RateLimiter.loginLimiter, AuthController.login);
authRouter.get("/google", RateLimiter.loginLimiter, GoogleAuthMiddleware.concern);
authRouter.get("/google/callback", GoogleAuthMiddleware.callback, AuthController.loginWithGoogle);
authRouter.post("/refresh", AuthController.refreshToken);
authRouter.post("/logout", RateLimiter.logoutLimiter,AuthMiddleware, AuthController.logout);


