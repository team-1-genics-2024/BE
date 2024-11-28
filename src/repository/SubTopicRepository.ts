import database from "../config/database";

const db = database;

export class SubTopicRepository {
    static async createSubtopic(name: string, topicId: number, description: string, imageUrl: string, videoUrl: string){
        return await db.subtopic.create({
            data: {
                name: name,
                topicId: topicId,
                description: description,
                imageUrl: imageUrl,
                videoUrl: videoUrl,
            }
        });
    }

    static async findTopic(topicId: number) {
        return await db.topic.findUnique({
            where: {
                id: topicId,
            }
        })
    }

    static async findByName(name: string) {
        return db.subtopic.findFirst({
          where: {
            name: name
          }
        });
      }

    static async findAll(topicId: number) {
        return db.subtopic.findMany({
            where: {
                topicId: topicId,
            }
        });
    }

    static async findById(id: number) {
        return db.subtopic.findUnique({
            where: {
                id: id,
            },
            include: {
                topic: {
                    select: {
                        classId: true,
                    }
                }
            }
        });
    }
}
