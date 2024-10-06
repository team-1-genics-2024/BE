import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "../service/userService";
import { CreateUserRequest } from "../model/UserModel";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";

export const userController = {
  async create(req: Request, res: Response) {
    try {
      const userReq = req.body as CreateUserRequest;
      const userRes = await userService.create(userReq);

      successResponse(res, StatusCodes.CREATED, "user created successfully", userRes);
    } catch (error) {
      if (error instanceof Error) {
        errorResponse(res, error);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const userRes = await userService.getAllUser();
      successResponse(res, StatusCodes.OK, "all users fetched successfully", userRes);
    } catch (error) {
      if (error instanceof Error) {
        errorResponse(res, error);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  },
};
