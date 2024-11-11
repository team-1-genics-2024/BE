import { Router } from "express";
import { ResultController } from "../controller/ResultController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const resultRouter = Router();

resultRouter.post("/create", AuthMiddleware, ResultController.create);
resultRouter.get("/quiz/:quiz_id", AuthMiddleware, ResultController.getAllResultByQuiz);
resultRouter.get("/:id", AuthMiddleware, ResultController.getResultById);
resultRouter.get("/user/:id", AuthMiddleware, ResultController.getAllResultByUser);
resultRouter.get("/class/:id", AuthMiddleware, ResultController.getAllResultByClass);
