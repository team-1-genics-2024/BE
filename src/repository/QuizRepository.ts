import database from "../config/database";

const db = database;

export class QuizRepository {
    static async createQuiz(
        data: any
    ){
        return await db.quiz.create({
            data:{
                name: data.name,
                totalMarks: data.totalMarks,
                classId: data.classId,
            }
        })
    }
    static async getAllQuizByClassId(classId: number) {
        return await db.quiz.findMany({
            where: {
                classId: classId,
            }
        })
    }

    static async getQuizById(quizId: number){
        return await db.quiz.findUnique({
            where: {
                id: quizId,
            }
        })
    }

}