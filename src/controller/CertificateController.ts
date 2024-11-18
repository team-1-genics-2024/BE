import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CertificateService } from "../service/CertificateService";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { AuthRequest } from "../model/AuthModel";

export class CertificateController {
  static async create(req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const data = {
        ...req.body,
        userId: request.user.id,
      };
      const certificateRes = await CertificateService.createCertificate(data);

      successResponse(res, StatusCodes.CREATED, "Certificate created successfully", certificateRes);
    } catch (error) {
      if (error instanceof Error) {
        errorResponse(res, error);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  }

  static async getCertificate(req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const data = {
        userId: request.user.id,
        classId: Number(req.params.classId),
      };
      const certificateRes = await CertificateService.getCertificate(data);

      successResponse(res, StatusCodes.OK, "Certificate found", certificateRes);
    } catch (error) {
      if (error instanceof Error) {
        errorResponse(res, error);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  }

  static async getAllCertificateByUser(req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const data = {
        userId: request.user.id,
      };
      const certificates = await CertificateService.getCertificateByUserId(data);

      successResponse(res, StatusCodes.OK, "Certificates fetched successfully", certificates);
    } catch (error) {
      if (error instanceof Error) {
        errorResponse(res, error);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  }
}