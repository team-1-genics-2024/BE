import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { QuizService } from "../service/QuizService";
import { Quiz } from "../model/QuizModel";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { AuthRequest } from "../model/AuthModel";

export class QuizController {
    static async create(req: Request, res: Response) {
        try {
            const quizReq = req.body as Quiz
            const quizRes = await QuizService.createQuiz(quizReq)

            successResponse(res, StatusCodes.CREATED, "Quiz created successfully", quizRes)
        }catch (error){
            if (error instanceof Error) {
                errorResponse(res, error);
              } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
              }
        }
    };

    static async getAllQuizByClass(req: Request, res: Response) {
        try {
            const request = req as AuthRequest;
            const data = {
                userId: request.user.id,
                classId: Number(request.params.classId)
            }
            const quizzes = await QuizService.getQuizByClass(data);
            successResponse(res, StatusCodes.OK, "Quiz retrieved successfully", quizzes);
        } catch (error) {
            if (error instanceof Error) {
                errorResponse(res, error);
            } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
            }
        }
    }

    static async getQuizById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const quiz = await QuizService.getQuizById(Number(id))
            successResponse(res, StatusCodes.OK, "Quiz retrieved successfully", quiz);
        } catch (error) {
            if (error instanceof Error) {
                errorResponse(res, error);
            } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
            }
        }
    }
}