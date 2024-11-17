import { Router } from "express";
import { QuizController } from "../controller/QuizController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { IsMembershipMiddleware } from "../middleware/IsMembershipMiddleware";
import { RateLimiter } from "../middleware/RateLimiter";

export const quizRouter = Router();

quizRouter.post("/create", AuthMiddleware, QuizController.create);;
// quizRouter.get("/:id", IsMembershipMiddleware, AuthMiddleware, QuizController.getQuizById);
quizRouter.get("/class/:classId", RateLimiter.publicLimiter, AuthMiddleware, IsMembershipMiddleware, QuizController.getAllQuizByClass);
