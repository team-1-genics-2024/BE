import { MembershipRepository } from "../repository/mebershipRepository";
import { ResponseError } from "../error/ResponseError";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../model/AuthModel";
import { errorResponse } from "../utils/api-response";

export const IsMembershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req as AuthRequest;
    const userId = request.user.id;
    console.log(request.user);
    const membership = await MembershipRepository.findByUserId(userId);
  
    if (!membership) {
      throw new ResponseError(StatusCodes.FORBIDDEN, "You are not a member");
    }
  
    const endDate = new Date(membership.endDate).getTime();
    const curDate = Date.now();
  
    if (endDate < curDate) {
      throw new ResponseError(StatusCodes.FORBIDDEN, "Your are not a member");
    }
    
    next();
  } catch (error) {
    if (error instanceof Error) {
      errorResponse(res, error);
    } else {
      errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
    }
  }
}
