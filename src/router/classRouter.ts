import { Router } from "express";
import { ClassController } from "../controller/ClassController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const classRouter = Router();

classRouter.get("/search", AuthMiddleware, ClassController.search);
classRouter.get("/:classId", AuthMiddleware, ClassController.get);
classRouter.get("/", AuthMiddleware, ClassController.getAll);

