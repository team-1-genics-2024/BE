import database from "../config/database";
import { appLogger } from "../config/logConfig";

const db = database;

export class RatingRepository {
  static async create(userId: number, classId: number, rating: number) {
    return await db.rating.create({
      data: {
        userId,
        classId,
        rating
      }
    });
  }

  static async findByClassId(classId: number) {
    return await db.rating.findMany({
      where: {
        classId
      }
    });
  }

  static async findByUserIdAndClassId(userId: number, classId: number) {
    return await db.rating.findFirst({
      where: {
        userId,
        classId
      }
    });
  }

}