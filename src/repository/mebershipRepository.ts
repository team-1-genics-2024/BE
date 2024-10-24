import db from "../config/database";
import { Membership } from "@prisma/client";

const database = db;

export class MembershipRepository {
  static async create(
    id: number
  ): Promise<Membership> {
    return await database.membership.create({
      data: {
        userId: id,
      },
    });
  }

  static async updateByUserId(userId: number): Promise<Membership> {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 30);
    return await database.membership.update({
      where: {
        userId: userId,
      },
      data: {
        isActive: true,
        endDate: newDate,
      },
    });
  }

  static async getById(id: number): Promise<Membership | null> {
    return await database.membership.findUnique({
      where: {
        id: id,
      },
    });
  }
}
