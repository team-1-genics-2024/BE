import { Router } from "express";
import { EnrollController } from "../controller/EnrollController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const enrollRouter = Router();

enrollRouter.post("/:classId", AuthMiddleware, EnrollController.enroll);
enrollRouter.get("/", AuthMiddleware, EnrollController.getEnrolledClass);