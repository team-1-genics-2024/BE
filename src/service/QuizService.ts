import {
    Quiz,
    GetQuizResponse,
    GetAllQuizResponse
} from '../model/QuizModel';
import { QuizRepository } from '../repository/QuizRepository';
import { ResponseError } from '../error/ResponseError';
import { StatusCodes } from 'http-status-codes';
import { ClassRepository } from '../repository/ClassRepository';
 
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

    static async getQuizByClass (request: number): Promise<GetAllQuizResponse> {
        const quizData = await QuizRepository.getAllQuizByClassId(request);
    
        if (!quizData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Quiz not found');
        }
    
        return {
          quizzes: quizData
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