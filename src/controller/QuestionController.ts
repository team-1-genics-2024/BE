import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { QuestionService } from "../service/QuestionService";
import { Question } from "../model/QuestionModel";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";

export class QuestionController {
    static async create(req: Request, res: Response) {
        try {
            const questionReq = req.body as Question
            const questionRes = await QuestionService.createQuestion(questionReq)

            successResponse(res, StatusCodes.CREATED, "Question created successfully", questionRes)
        }catch (error){
            if (error instanceof Error) {
                errorResponse(res, error);
              } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
              }
        }
    };

    static async getAllQuestionByQuiz(req: Request, res: Response) {
        try {
            const { quiz_id } = req.params
            const questions = await QuestionService.getQuestionByQuiz(Number(quiz_id))
            successResponse(res, StatusCodes.OK, "Question retrieved successfully", questions);
        } catch (error) {
            if (error instanceof Error) {
                errorResponse(res, error);
            } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
            }
        }
    }

    static async getQuestionById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const questions = await QuestionService.getQuestionById(Number(id))
            successResponse(res, StatusCodes.OK, "Question retrieved successfully", questions);
        } catch (error) {
            if (error instanceof Error) {
                errorResponse(res, error);
            } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
            }
        }
    }
}