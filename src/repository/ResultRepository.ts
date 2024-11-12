import database from "../config/database";

const db = database;

export class ResultRepository {

    static async createResult(
        data: any
    ){
        return await db.result.create({
            data: {
              userId: data.userId,
              score: data.score,
              quizId: data.quizId,
              topicId: data.topicId,
              classId: data.classId,
            }
          });
    }

    static async getAllResultByUserId(userId: number) {
        return await db.result.findMany({
            where: {
                userId: userId,
            }
        })
    }

    static async getAllResultByClassId(classId: number) {
        return await db.result.findMany({
            where: {
                classId: classId,
            }
        })
    }

    static async getResultById(resultId: number){
        return await db.result.findUnique({
            where: {
                id: resultId,
            }
        })
    }

    static async updateResult(resultId: number, data: any){
        return await db.result.update({
            where: {id: resultId},
            data: data
        })
    }

}