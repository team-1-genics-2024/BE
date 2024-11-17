import {
    Quiz,
    GetQuizResponse,
    GetAllQuizResponse,
    GetQuizRequest
} from '../model/QuizModel';
import { QuizRepository } from '../repository/QuizRepository';
import { ResponseError } from '../error/ResponseError';
import { StatusCodes } from 'http-status-codes';
import { ClassRepository } from '../repository/ClassRepository';
import { EnrollRepository } from '../repository/EnrollRepository';
 
export class QuizService {

    static async createQuiz(request: Quiz){
        const classData = await ClassRepository.findById(request.classId);

        if (!classData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Class not found');
        }
        
        const data = {
            name: request.name,
            totalMarks: request.totalMarks,
            classId: request.classId,
        }
        return await QuizRepository.createQuiz(data);

    }

    static async getQuizByClass (request: GetQuizRequest): Promise<GetQuizResponse> {
        const quizData = await QuizRepository.getQuizByClassId(request.classId);
    
        if (!quizData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Quiz not found');
        }

        const isEnrolled = await EnrollRepository.findByUserIdAndClassId(request.userId, request.classId);

        if (!isEnrolled) {
            throw new ResponseError(StatusCodes.FORBIDDEN, "You not enrolled in this class");
        }
    
        return {
          quiz: quizData
        };
      }

      static async getQuizById (request: number): Promise<GetQuizResponse> {
        const quizData = await QuizRepository.getQuizById(request);
    
        if (!quizData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Quiz not found');
        }
    
        return {
          quiz: quizData
        };
      }
}