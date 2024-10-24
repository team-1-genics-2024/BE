import express from "express";
import { productController } from "../controller/productController";

export const productRouter = express.Router();

productRouter.post("/payment", productController.payment);
productRouter.post("/notification", productController.notification);
