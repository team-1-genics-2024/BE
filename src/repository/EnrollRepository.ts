import database from "../config/database";

const db = database;

export class EnrollRepository {
  static async create(userId: number, classId: number) {
    return await db.enrollment.create({
      data: {
        userId,
        classId
      }
    });
  }

  static async findByUserId(userId: number) {
    return await db.enrollment.findMany({
      where: {
        userId
      },
      include: {
        class: true
      }
    });
  }

  static async findByUserIdAndClassId(userId: number, classId: number) {
    return await db.enrollment.findFirst({
      where: {
        userId,
        classId
      }
    });
  }
}