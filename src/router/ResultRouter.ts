import { Router } from "express";
import { ResultController } from "../controller/ResultController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { IsMembershipMiddleware } from "../middleware/IsMembershipMiddleware";
import { RateLimiter } from "../middleware/RateLimiter";

export const resultRouter = Router();

resultRouter.post("/create", RateLimiter.complexLimiter, AuthMiddleware, IsMembershipMiddleware, ResultController.create);
// resultRouter.get("/quiz/:quiz_id", AuthMiddleware, ResultController.getAllResultByQuiz);
// resultRouter.get("/:id", AuthMiddleware, ResultController.getResultById);
// resultRouter.get("/user/:id", AuthMiddleware, ResultController.getAllResultByUser);
// resultRouter.get("/class/:id", AuthMiddleware, ResultController.getAllResultByClass);
resultRouter.get("/class/:classId", RateLimiter.publicLimiter, AuthMiddleware, ResultController.getByUserIdAndClassId);
