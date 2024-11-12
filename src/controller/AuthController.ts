import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from './../service/AuthService';
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { AuthRequest, LoginRequest } from "../model/AuthModel";
import { appLogger } from "../config/logConfig";

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
        secure: true,
        sameSite: 'none',
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

  static async loginWithGoogle(req: Request, res: Response) {
   try {
      const request = req as AuthRequest;
      const response = await AuthService.loginWithGoogle(request);

      res.cookie('accessToken', response.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY as string),
      });

      res.cookie('refreshToken', response.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: parseInt(process.env.SESSION_EXPIRY as string),
      });

      res.redirect(process.env.CLIENT_REDIRECT_URL as string);
   } catch (err) {
      res.redirect(process.env.CLIENT_FAILED_REDIRECT_URL as string);
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

  static async logout (req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const logoutReq = {
        userId: request.user.id
      };
      await AuthService.logoutUser(logoutReq);

      res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'none' });
      res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'none' });

      successResponse(res, StatusCodes.OK, "Logout Success");
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError (StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error'));
      }
    }
  }
}
