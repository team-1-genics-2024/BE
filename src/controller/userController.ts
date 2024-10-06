import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "../service/userService";
import { CreateUserRequest } from "../dtos/userDto";

export const userController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userReq = req.body as CreateUserRequest;
      const userRes = await userService.create(userReq);

      return res.status(StatusCodes.CREATED).json({
        status: true,
        message: "user created successfully",
        data: userRes,
      });
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userRes = await userService.findAll();
      return res.status(StatusCodes.OK).json({
        status: true,
        message: "all users fetched successfully",
        data: userRes,
      });
    } catch (error) {
      next(error);
    }
  },
};
