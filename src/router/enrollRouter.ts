import { Router } from "express";
import { EnrollController } from "../controller/EnrollController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { IsMembershipMiddleware } from "../middleware/IsMembershipMiddleware";
import { RateLimiter } from "../middleware/RateLimiter";

export const enrollRouter = Router();

enrollRouter.post("/:classId", RateLimiter.complexLimiter, AuthMiddleware, IsMembershipMiddleware, EnrollController.enroll);
enrollRouter.get("/:classId", RateLimiter.publicLimiter, AuthMiddleware, EnrollController.checkIsEnrolled);
enrollRouter.get("/", RateLimiter.publicLimiter, AuthMiddleware, EnrollController.getEnrolledClass);
enrollRouter.get("/search", RateLimiter.publicLimiter, AuthMiddleware, EnrollController.searchEnrolledClass);