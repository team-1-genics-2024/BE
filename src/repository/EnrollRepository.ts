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
        class: {
          include: {
            topics: {
              include: {
                subtopics: true
              }
            },
            _count: {
              select: {
                userProgress: true
              }
            }
          }
        },
      }
    });
  }

  static async findByUserIdAndKeyword(userId: number, keyword: string) {
    return await db.enrollment.findMany({
      where: {
        userId,
        class: {
          OR: [
            {
              name: {
                contains: keyword,
                mode: 'insensitive'
              }
            },
            {
              description: {
                contains: keyword,
                mode: 'insensitive'
              }
            }
          ]
        }
      },
      include: {
        class: {
          include: {
            topics: {
              include: {
                subtopics: true
              }
            },
            _count: {
              select: {
                userProgress: true
              }
            }
          }
        }
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

  static async countByClassId(classId: number) {
    return await db.enrollment.count({
      where: {
        classId
      }
    });
  }
}