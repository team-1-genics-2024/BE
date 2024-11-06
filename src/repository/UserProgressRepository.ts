import database from "../config/database";

const db = database;

export class UserProgressRepository {
  static async create(userId: number, subtopicId: number, classId: number) {
    return await db.userProgress.create({
      data: {
        userId,
        subtopicId,
        classId
      }
    });
  }

  static async findByUserIdAndSubtopicId(userId: number, subtopicId: number) {
    return await db.userProgress.findMany({
      where: {
        userId,
        subtopicId
      }
    });
  }

  static async countByUserIdAndClassId(userId: number, classId: number) {
    return await db.userProgress.count({
      where: {
        userId,
        classId
      }
    });
  }
}