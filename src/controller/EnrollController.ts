import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { EnrollService } from "../service/EnrollService";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { AuthRequest } from "../model/AuthModel";

export class EnrollController {
  static async enroll(req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const enrollReq = {
        userId: request.user.id,
        classId: parseInt(request.params.classId)
      } 
      const response = await EnrollService.enrollUser(enrollReq);
      successResponse(res, StatusCodes.OK, "Enroll success", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  }

  static async getEnrolledClass(req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const getReq = {
        userId: request.user.id
      }
      const response = await EnrollService.getEnrolledClass(getReq);
      successResponse(res, StatusCodes.OK, "Get enrolled class success", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  }
}