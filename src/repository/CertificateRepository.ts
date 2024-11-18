import database from "../config/database";

const db = database;

export class CertificateRepository {
  static async create(id: string, userId: number, classId: number) {
    return await db.certificate.create({
      data: {
        id,
        userId,
        classId
      }
    });
  }

  static async findByUserIdAndClassId(userId: number, classId: number) {
    return await db.certificate.findUnique({
        where: {
            userId_classId: {
                userId,
                classId
            }
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true
                }
            },
            class: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
  }

  static async findByUserId(userId: number) {
    return await db.certificate.findMany({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true
                }
            },
            class: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
  }
}