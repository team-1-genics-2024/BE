import { Router } from "express";
import { CertificateController } from "../controller/CertificateController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { IsMembershipMiddleware } from "../middleware/IsMembershipMiddleware";
import { RateLimiter } from "../middleware/RateLimiter";

export const certificateRouter = Router();

certificateRouter.post("/", RateLimiter.complexLimiter, AuthMiddleware, IsMembershipMiddleware, CertificateController.create);
certificateRouter.get("/class/:classId", RateLimiter.publicLimiter, AuthMiddleware, CertificateController.getCertificate);