import rateLimit from "express-rate-limit";
import { ResponseError } from "../error/ResponseError";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/api-response";
import { Request, Response, NextFunction } from 'express';

export class RateLimiter {
    private static getLimiter(options: any) {
        if (process.env.NODE_ENV === 'development') {
            return (req: Request, res: Response, next: NextFunction) => next();
        }
        return rateLimit(options);
    }

    static readonly registerLimiter = RateLimiter.getLimiter({
        windowMs: 15 * 60 * 1000,
        max: 2,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });

    static readonly loginLimiter = RateLimiter.getLimiter({
        windowMs: 15 * 60 * 1000,
        max: 5,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });

    static readonly logoutLimiter = RateLimiter.getLimiter({
        windowMs: 15 * 60 * 1000,
        max: 10,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });

    static readonly publicLimiter = RateLimiter.getLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });

    static readonly getUserLimiter = RateLimiter.getLimiter({
        windowMs: 15 * 60 * 1000,
        max: 200,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });

    static readonly refreshTokenLimiter = RateLimiter.getLimiter({
        windowMs: 15 * 60 * 1000,
        max: 50,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });

    static readonly complexLimiter = RateLimiter.getLimiter({
        windowMs: 15 * 60 * 1000,
        max: 10,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });

    static readonly paymentLimiter = RateLimiter.getLimiter({
        windowMs: 15 * 60 * 1000,
        max: 5,
        handler: (req: Request, res: Response) => {
            errorResponse(res, new ResponseError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests, please try again in 15 minutes"));
        }
    });
}
