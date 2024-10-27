import express from "express";

import { MembershipController } from "../controller/membershipController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const membershipRouter = express.Router();

membershipRouter.post("/", AuthMiddleware, MembershipController.create);
membershipRouter.get("/:id", MembershipController.getById);
membershipRouter.put("/", AuthMiddleware, MembershipController.updateByUserId);
membershipRouter.get("/", MembershipController.getAll);