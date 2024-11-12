import {
    Question,
    GetAllQuestionsResponse,
    GetQuestionResponse
} from '../model/QuestionModel';
import { QuestionRepository } from '../repository/QuestionRepository';
import { ResponseError } from '../error/ResponseError';
import { StatusCodes } from 'http-status-codes';
import { QuizRepository } from '../repository/QuizRepository';
 
export class QuestionService {
    static async createQuestion(request: Question){
        const quizData = await QuizRepository.getQuizById(request.quizId);

        if (!quizData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Quiz not found');
        }
        
        const data = {
            question: request.question,
            optionA: request.optionA,
            optionB: request.optionB,
            optionC: request.optionC,
            optionD: request.optionD,
            correctAns: request.correctAns,
            marks: request.marks,
            quizId: request.quizId
        }
        return await QuestionRepository.createQuestion(data);
    }

    static async getQuestionByQuiz (request: number): Promise<GetAllQuestionsResponse> {
        const questionData = await QuestionRepository.getAllQuestionByQuizId(request);
    
        if (!questionData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Question not found');
        }
    
        return {
          questions: questionData
        };
      }

      static async getQuestionById (request: number): Promise<GetQuestionResponse> {
        const questionData = await QuestionRepository.getQuestionById(request);
    
        if (!questionData) {
          throw new ResponseError(StatusCodes.NOT_FOUND, 'Question not found');
        }
    
        return {
          question: questionData
        };
      }
}