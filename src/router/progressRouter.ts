import { Router } from "express";
import { UserProgressController } from "../controller/UserProgressController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { IsMembershipMiddleware } from "../middleware/IsMembershipMiddleware";

export const userProgressRouter = Router();

userProgressRouter.post("/:classId/:subtopicId", AuthMiddleware, IsMembershipMiddleware, UserProgressController.createUserProgress);