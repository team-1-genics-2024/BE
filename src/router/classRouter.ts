import { Router } from "express";
import { ClassController } from "../controller/ClassController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { IsMembershipMiddleware } from "../middleware/IsMembershipMiddleware";

export const classRouter = Router();

classRouter.get("/search", ClassController.search);
classRouter.get("/:classId", ClassController.get);
classRouter.get("/", ClassController.getAll);
classRouter.put("/:classId/rating", AuthMiddleware, IsMembershipMiddleware, ClassController.updateRating);

