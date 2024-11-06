import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserProgressService } from "../service/UserProgressService";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { AuthRequest } from "../model/AuthModel";
import { appLogger } from "../config/logConfig";

export class UserProgressController {
  static async createUserProgress(req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const userProgressReq = {
        userId: request.user.id,
        subtopicId: parseInt(req.params.subtopicId),
        classId: parseInt(req.params.classId)
      };
      const response = await UserProgressService.createUserProgress(userProgressReq);

      successResponse(res, StatusCodes.CREATED, "User progress created", response);
    } catch (err) {
      if (err instanceof ResponseError) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  }
}