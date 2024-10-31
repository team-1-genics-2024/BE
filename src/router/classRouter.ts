import { Router } from "express";
import { ClassController } from "../controller/ClassController";

export const classRouter = Router();

classRouter.get("/search", ClassController.search);
classRouter.get("/:classId", ClassController.get);
classRouter.get("/", ClassController.getAll);

