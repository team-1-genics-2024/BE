import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from './../service/AuthService';
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { AuthRequest, LoginRequest } from "../model/AuthModel";
import { appLogger } from "../config/logConfig";
import { parse } from "dotenv";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const loginReq: LoginRequest = {
        body: req.body,
        user_agent: req.headers["user-agent"] as string,
        ip_address: req.ip as string
      };
      const response = await AuthService.loginUser(loginReq);

      res.cookie('refreshToken', response.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: parseInt(process.env.SESSION_EXPIRY as string),
      });

      const resData = {
        accessToken: response.accessToken,
      }

      successResponse(res, StatusCodes.OK, "Login Success", resData);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError (StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error'));
      }
    }
  }

  static async refreshToken (req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const refreshReq = {
        refreshToken: request.cookies.refreshToken,
        userAgent: request.headers['user-agent'] as string,
        ipAddress: request.ip as string
      };
      const response = await AuthService.refreshUserToken(refreshReq);
      successResponse(res, StatusCodes.OK, "Token refreshed successfully", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError (StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error'));
      }
    }
  }
}