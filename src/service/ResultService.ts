import {
    Result,
    GetAllResultsResponse,
    GetResultResponse,
    GetResultByUserIdAndClassIdRequest,
} from '../model/ResultModel';

import { ResultRepository } from '../repository/ResultRepository'
import { ResponseError } from '../error/ResponseError';
import { StatusCodes } from 'http-status-codes';
import { QuizRepository } from '../repository/QuizRepository';
import { ClassRepository } from '../repository/ClassRepository';
import { UserRepository } from '../repository/UserRepository';
import { EnrollService } from './EnrollService';

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

        const enrolledClasses = await EnrollService.getEnrolledClass({userId: request.userId});

        const isEnrolled = enrolledClasses.classes.find((enroll) => enroll.id === request.classId);

        if (!isEnrolled) {
            throw new ResponseError(StatusCodes.FORBIDDEN, "You are not enrolled in this class");
        }

        if (isEnrolled.totalUserProgress !== isEnrolled.totalSubtopics) {
            throw new ResponseError(StatusCodes.FORBIDDEN, "You not completed all subtopic in this class");
        }
        
        const data = {
            userId: request.userId,
            score: request.score,
            quizId: request.quizId,
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
    static async getByUserIdAndClassId (request: GetResultByUserIdAndClassIdRequest): Promise<GetResultResponse> {
        const resultData = await ResultRepository.getByUserIdAndClassId(request.userId, request.classId);
    
        if (!resultData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Result not found');
        }
    
        return {
          result: resultData
        };
    }
}
