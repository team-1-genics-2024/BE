import database from "../config/database";

const db = database;

export class ClassRepository {

  static async findById(id: number) {
    return await db.class.findUnique({
      where: { id },
      include: {
        topics: {
          include: {
            _count: {
              select: {
                subtopics: true
              }
            }
          }
        },
        _count: {
          select: {
            topics: true
          }
        }
      }
    });
  }

  static async searchByKeyword(keyword: string) {
    return await db.class.findMany({
      where: {
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
      },
      include: {
        topics: {
          include: {
            _count: {
              select: {
                subtopics: true
              }
            }
          }
        },
        _count: {
          select: {
            topics: true
          }
        }
      }
    });
  }

  static async findAll() {
    return await db.class.findMany({
      include: {
        topics: {
          include: {
            _count: {
              select: {
                subtopics: true
              }
            }
          }
        },
        _count: {
          select: {
            topics: true
          }
        }
      }
    });
  }

  static async updateRating (classId: number, rating: number) {
    return await db.class.update({
      where: {
        id: classId
      },
      data: {
        rating
      }
    });
  }
}