import { Request, Response, NextFunction } from "express";
import {
  CreateMembershipRequest,
  UpdateMembershipRequest,
} from "../model/membershipModel";
import { MembershipService } from "../service/membershipService";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { AuthRequest } from "../model/AuthModel";

export class MembershipController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req as AuthRequest;
      const userId = user.user.id;
      // const membershipReq: CreateMembershipRequest =
      //   req.body as CreateMembershipRequest;
      const membershipRes = await MembershipService.create(userId);

      successResponse(
        res,
        StatusCodes.CREATED,
        "Membership created",
        membershipRes
      );
    } catch (e) {
      if (e instanceof Error) {
        errorResponse(res, e);
      } else {
        errorResponse(
          res,
          new ResponseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
          )
        );
      }
      next(e);
    }
  }

  static async updateByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      // const id = Number(req.params.id);
      const user = req as AuthRequest;
      const userId = user.user.id;
      const membershipRes = await MembershipService.updateByUserId(userId);

      successResponse(res, StatusCodes.OK, "Membership updated", membershipRes);
    } catch (e) {
      if (e instanceof Error) {
        errorResponse(res, e);
      } else {
        errorResponse(
          res,
          new ResponseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
          )
        );
      }
      next(e);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const membership = await MembershipService.getById(id);

      if (membership) {
        successResponse(res, StatusCodes.OK, "Membership found", membership);
      } else {
        errorResponse(
          res,
          new ResponseError(StatusCodes.NOT_FOUND, "Membership not found")
        );
      }
    } catch (e) {
      if (e instanceof Error) {
        errorResponse(res, e);
      } else {
        errorResponse(
          res,
          new ResponseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
          )
        );
      }
      next(e);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const memberships = await MembershipService.getAll();

      successResponse(res, StatusCodes.OK, "Memberships found", memberships);
    } catch (e) {
      if (e instanceof Error) {
        errorResponse(res, e);
      } else {
        errorResponse(
          res,
          new ResponseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
          )
        );
      }
      next(e);
    }
  }

  static async getRemaining(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req as AuthRequest;
      const userId = user.user.id;
      const remaining = await MembershipService.getRemaining(userId);

      successResponse(res, StatusCodes.OK, "Membership remaining", remaining);
    } catch (e) {
      if (e instanceof Error) {
        errorResponse(res, e);
      } else {
        errorResponse(
          res,
          new ResponseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
          )
        );
      }
      next(e);
    }
  }
}
