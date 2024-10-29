import database from "../config/database";

const db = database;

export class ClassRepository {

  static async findById(id: number) {
    return await db.class.findUnique({
      where: { id }
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
      }
    });
  }
   
  static async findAll() {
    return await db.class.findMany();
  }
}