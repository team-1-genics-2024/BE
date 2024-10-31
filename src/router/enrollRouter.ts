import { Router } from "express";
import { EnrollController } from "../controller/EnrollController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { IsMembershipMiddleware } from "../middleware/IsMembershipMiddleware";

export const enrollRouter = Router();

enrollRouter.post("/:classId", AuthMiddleware, IsMembershipMiddleware, EnrollController.enroll);
enrollRouter.get("/", AuthMiddleware, EnrollController.getEnrolledClass);