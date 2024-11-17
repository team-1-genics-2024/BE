import database from "../config/database";

const db = database;

export class QuestionRepository {
    static async createQuestion(
        data: any
    ){
        console.log(data)
        return await db.question.create({
            data: {
                question: data.question,
                optionA: data.optionA,
                optionB: data.optionB,
                optionC: data.optionC,
                optionD: data.optionD,
                correctAns: data.correctAns,
                marks: data.marks,
                quizId: data.quizId, 
            }
        })
    }

    
    static async getAllQuestionByQuizId(quizId: number) {
        return await db.question.findMany({
            where: {
                quizId: quizId,
            }
        })
    }

    static async getQuestionById(questionId: number){
        return await db.question.findUnique({
            where: {
                id: questionId,
            }
        })
    }

}