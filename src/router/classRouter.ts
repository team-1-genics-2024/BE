import { Router } from "express";
import { ClassController } from "../controller/ClassController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { IsMembershipMiddleware } from "../middleware/IsMembershipMiddleware";
import { RateLimiter } from "../middleware/RateLimiter";

export const classRouter = Router();

classRouter.get("/search", RateLimiter.publicLimiter, ClassController.search);
classRouter.get("/:classId", RateLimiter.publicLimiter, ClassController.get);
classRouter.get("/", RateLimiter.publicLimiter, ClassController.getAll);
classRouter.put("/:classId/rating", RateLimiter.complexLimiter, AuthMiddleware, IsMembershipMiddleware, ClassController.updateRating);

