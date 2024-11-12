import { Router } from "express";
import { QuestionController } from "../controller/QuestionController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const questionRouter = Router();

questionRouter.post("/create", AuthMiddleware, QuestionController.create);
questionRouter.get("/quiz:quiz_id", AuthMiddleware, QuestionController.getAllQuestionByQuiz);
questionRouter.get("/:id", AuthMiddleware, QuestionController.getQuestionById);
