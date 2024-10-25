import database from "../config/database";

const db = database;

export class TopicRepository {
    static async createTopic(name: string, classId: number) {
        return await db.topic.create({
            data: {
                name: name,
                classId: classId,
            },
        });
    }

    static async findClass(classId: number) {
        return await db.class.findUnique({
            where: {
                id: classId,
            }
        })
    }

    static async findByName(name: string) {
        return db.topic.findFirst({
          where: {
            name: name
          }
        });
      }

    static async findAll(classId: number) {
        return db.topic.findMany({
            where: {
                classId: classId,
            }
        });
    }
}