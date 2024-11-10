import rateLimit from "express-rate-limit";
import { ResponseError } from "../error/ResponseError";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/api-response";
import { Request, Response } from "express";

export class RateLimiter {
    static readonly registerLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 2,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });

    static readonly loginLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 5,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });
    
    static readonly logoutLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 10,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });

    static readonly publicLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });

    static readonly getUserLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 200,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });

    static readonly refreshTokenLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });

    static readonly complexLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 10,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });

    static readonly paymentLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 5,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });
}
