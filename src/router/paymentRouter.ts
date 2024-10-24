import express from "express";
import { paymentController } from "../controller/paymentController";

export const paymentRouter = express.Router();

paymentRouter.post("/", paymentController.payment);
paymentRouter.post("/notification", paymentController.notification);
