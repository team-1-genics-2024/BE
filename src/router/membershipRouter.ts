import express from "express";

import { MembershipController } from "../controller/membershipController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { RateLimiter } from "../middleware/RateLimiter";

export const membershipRouter = express.Router();

membershipRouter.post("/", RateLimiter.complexLimiter, AuthMiddleware, MembershipController.create);
membershipRouter.get("/remaining", RateLimiter.publicLimiter, AuthMiddleware, MembershipController.getRemaining);
membershipRouter.put("/", RateLimiter.publicLimiter, AuthMiddleware, MembershipController.updateByUserId);
membershipRouter.get("/", RateLimiter.publicLimiter, MembershipController.getAll);
// --- INI COMMENT AJAA
// membershipRouter.get("/:id", RateLimiter.publicLimiter, MembershipController.getById);