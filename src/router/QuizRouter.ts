import { Router } from "express";
import { QuizController } from "../controller/QuizController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const quizRouter = Router();

quizRouter.post("/create", AuthMiddleware, QuizController.create);;
quizRouter.get("/:id", AuthMiddleware, QuizController.getQuizById);
quizRouter.get("/class/:id", AuthMiddleware, QuizController.getAllQuizByClass);
