import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ClassService } from "../service/ClassService";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";

export class ClassController {
  static async get(req: Request, res: Response) {
    try {
      const request = {
        id: parseInt(req.params.classId)
      };
      const response = await ClassService.getClass(request);
      successResponse(res, StatusCodes.OK, "Class found", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  }

  static async search(req: Request, res: Response) {
    try {
      const request = {
        keyword: req.query.keyword as string
      };
      const response = await ClassService.searchClass(request);
      successResponse(res, StatusCodes.OK, "Classes found", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const response = await ClassService.getAllClass();
      successResponse(res, StatusCodes.OK, "Classes found", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  }
}