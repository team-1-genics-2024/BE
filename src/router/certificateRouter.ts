import { Router } from "express";
import { CertificateController } from "../controller/CertificateController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { RateLimiter } from "../middleware/RateLimiter";

export const certificateRouter = Router();

certificateRouter.get("/class/:classId", RateLimiter.complexLimiter, AuthMiddleware, CertificateController.getCertificate);
certificateRouter.get("/", RateLimiter.publicLimiter, AuthMiddleware, CertificateController.getAllCertificateByUser);