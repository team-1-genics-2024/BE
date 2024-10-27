import { CreateTopicRequest, GetTopicResponse } from "../model/TopicModel"
import { ResponseError } from "../error/ResponseError";
import { TopicRepository } from "../repository/TopicRepository";

export class TopicService {

    static async CreateTopic (request: CreateTopicRequest): Promise<GetTopicResponse> {
        const classExist = await TopicRepository.findClass(request.classId)

        if (classExist == null) {
            throw new ResponseError(404, "Class not exists");
        }
        const topicExist = await TopicRepository.findByName(request.name)

        if (topicExist) {
            throw new ResponseError(409, "Topic already exists");
        }
        const topic = await TopicRepository.createTopic(request.name, request.classId)
        return {
            name: topic.name,
            classId: topic.classId,
        }
    }

    static async GetAllTopics(req: number): Promise<GetTopicResponse[]> {
        const topics = await TopicRepository.findAll(req);
        
        const classExist = await TopicRepository.findClass(req)

        if (classExist == null) {
            throw new ResponseError(404, "Class not exists");
        }

        return topics.map(topic => ({
            name: topic.name,
            classId: topic.classId,
        }));
    }
}