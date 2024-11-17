import { Router } from "express";
import { QuestionController } from "../controller/QuestionController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { IsMembershipMiddleware } from "../middleware/IsMembershipMiddleware";
import { RateLimiter } from "../middleware/RateLimiter";

export const questionRouter = Router();

questionRouter.post("/create", AuthMiddleware, QuestionController.create);
questionRouter.get("/class/:classId/quiz/:quizId", RateLimiter.publicLimiter, AuthMiddleware, IsMembershipMiddleware, QuestionController.getAllQuestionByQuiz);
// questionRouter.get("/:id", IsMembershipMiddleware, AuthMiddleware, QuestionController.getQuestionById);
