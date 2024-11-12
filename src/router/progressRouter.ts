import { Router } from "express";
import { UserProgressController } from "../controller/UserProgressController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { IsMembershipMiddleware } from "../middleware/IsMembershipMiddleware";
import { RateLimiter } from "../middleware/RateLimiter";

export const userProgressRouter = Router();

userProgressRouter.post("/:classId/:subtopicId", RateLimiter.complexLimiter, AuthMiddleware, IsMembershipMiddleware, UserProgressController.createUserProgress);