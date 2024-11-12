import {
    Result,
    GetAllResultsResponse,
    GetResultResponse,
} from '../model/ResultModel';

import { ResultRepository } from '../repository/ResultRepository'
import { ResponseError } from '../error/ResponseError';
import { StatusCodes } from 'http-status-codes';
import { QuizRepository } from '../repository/QuizRepository';
import { ClassRepository } from '../repository/ClassRepository';
import { UserRepository } from '../repository/UserRepository';

export class ResultService {
    static async createResult (request: Result){
        const userData = await UserRepository.findById(request.userId);

        if (!userData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found');
        }
        
        const classData = await ClassRepository.findById(request.classId);

        if (!classData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Class not found');
        }
        
        const quizData = await QuizRepository.getQuizById(request.quizId);

        if (!quizData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Quiz not found');
        }
        
        const data = {
            userId: request.userId,
            score: request.score,
            quizId: request.quizId,
            topicId: request.topicId,
            classId: request.classId,
        }

        return await ResultRepository.createResult(data);
    }
    static async updateResult (result_id:number, request: Result){
        const userData = await UserRepository.findById(request.userId);

        if (!userData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found');
        }
        
        const classData = await ClassRepository.findById(request.classId);

        if (!classData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Class not found');
        }
        
        const quizData = await QuizRepository.getQuizById(request.quizId);

        if (!quizData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Quiz not found');
        }
        const resultData = await ResultRepository.getResultById(request.id)
        
        if (!resultData) {
            throw new ResponseError(StatusCodes.NOT_FOUND, 'Result not found');
        }
        
        const data = {
            userId: request.userId,
            score: request.score,
            quizId: request.quizId,
            topicId: request.topicId,
            classId: request.classId,
        }

        return await ResultRepository.updateResult(result_id, data);
    }

    static async getAllResultByUserId (request: number): Promise<GetAllResultsResponse> {
        const resultData = await ResultRepository.getAllResultByClassId(request);
    
        if (!resultData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Result not found');
        }
    
        return {
          results: resultData
        };
    }
    static async getAllResultByClassId (request: number): Promise<GetAllResultsResponse> {
        const resultData = await ResultRepository.getAllResultByClassId(request);
    
        if (!resultData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Result not found');
        }
    
        return {
          results: resultData
        };
    }
    static async getAllResultByQuizId (request: number): Promise<GetAllResultsResponse> {
        const resultData = await ResultRepository.getAllResultByClassId(request);
    
        if (!resultData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Result not found');
        }
    
        return {
          results: resultData
        };
    }
    static async getResultById (request: number): Promise<GetResultResponse> {
        const resultData = await ResultRepository.getResultById(request);
    
        if (!resultData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Result not found');
        }
    
        return {
          result: resultData
        };
    }
}
