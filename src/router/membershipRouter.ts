import express from "express";

import { MembershipController } from "../controller/membershipController";

export const membershipRouter = express.Router();

membershipRouter.post("/", MembershipController.create);
membershipRouter.get("/:id", MembershipController.getById);
membershipRouter.post("/update/:id", MembershipController.updateByUserId);
