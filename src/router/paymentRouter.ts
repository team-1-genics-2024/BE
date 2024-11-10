import express from "express";
import { paymentController } from "../controller/paymentController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { RateLimiter } from "../middleware/RateLimiter";

export const paymentRouter = express.Router();

paymentRouter.post("/", RateLimiter.paymentLimiter, AuthMiddleware, paymentController.payment);
paymentRouter.post("/notification", RateLimiter.paymentLimiter, paymentController.notification);
paymentRouter.get("/", RateLimiter.publicLimiter, paymentController.getAll);
