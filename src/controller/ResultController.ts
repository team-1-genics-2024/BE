import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResultService } from "../service/ResultService";
import { Result } from "../model/ResultModel";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { AuthRequest } from "../model/AuthModel";

export class ResultController {
    static async create(req: Request, res: Response) {
        try {
            const request = req as AuthRequest
            const data = {
                ...req.body,
                userId: request.user.id
            } as Result
            const ResultRes = await ResultService.createResult(data)

            successResponse(res, StatusCodes.CREATED, "Result created successfully", ResultRes)
        }catch (error){
            if (error instanceof Error) {
                errorResponse(res, error);
              } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
              }
        }
    };

    static async update(req: Request, res: Response) {
        try {
            const Result_Id = req.params
            const ResultReq = req.body as Result
            const ResultRes = await ResultService.updateResult(Number(Result_Id),ResultReq)

            successResponse(res, StatusCodes.CREATED, "Result updated successfully", ResultRes)
        }catch (error){
            if (error instanceof Error) {
                errorResponse(res, error);
              } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
              }
        }
    };

    static async getAllResultByQuiz(req: Request, res: Response) {
        try {
            const { quiz_id } = req.params
            const results = await ResultService.getAllResultByQuizId(Number(quiz_id))
            successResponse(res, StatusCodes.OK, "Result retrieved successfully", results);
        } catch (error) {
            if (error instanceof Error) {
                errorResponse(res, error);
            } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
            }
        }
    }

    static async getResultById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const results = await ResultService.getResultById(Number(id))
            successResponse(res, StatusCodes.OK, "Result retrieved successfully", results);
        } catch (error) {
            if (error instanceof Error) {
                errorResponse(res, error);
            } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
            }
        }
    }

    static async getAllResultByClass(req: Request, res: Response) {
        try {
            const { class_id } = req.params
            const results = await ResultService.getAllResultByClassId(Number(class_id))
            successResponse(res, StatusCodes.OK, "Result retrieved successfully", results);
        } catch (error) {
            if (error instanceof Error) {
                errorResponse(res, error);
            } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
            }
        }
    }

    static async getAllResultByUser(req: Request, res: Response) {
        try {
            const { user_id } = req.params
            const results = await ResultService.getAllResultByUserId(Number(user_id))
            successResponse(res, StatusCodes.OK, "Result retrieved successfully", results);
        } catch (error) {
            if (error instanceof Error) {
                errorResponse(res, error);
            } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
            }
        }
    }

    static async getByUserIdAndClassId(req: Request, res: Response) {
        try {
            const request = req as AuthRequest
            const data = {
                userId: request.user.id,
                classId: Number(req.params.classId)
            }
            const result = await ResultService.getByUserIdAndClassId(data)
            successResponse(res, StatusCodes.OK, "Result retrieved successfully", result);
        } catch (error) {
            if (error instanceof Error) {
                errorResponse(res, error);
            } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
            }
        }
    }
}