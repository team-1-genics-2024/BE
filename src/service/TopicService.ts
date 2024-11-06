import { CreateTopicRequest, GetTopicResponse } from "../model/TopicModel"
import { ResponseError } from "../error/ResponseError";
import { TopicRepository } from "../repository/TopicRepository";
import { SubTopicRepository } from "../repository/SubTopicRepository";
import { GetSubTopicResponse } from "../model/SubTopicModel";

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

    static async GetAllTopics(classId: number): Promise<GetTopicResponse[]> {
        const classExist = await TopicRepository.findClass(classId)
        if (classExist == null) {
            throw new ResponseError(404, "Class not exists");
        }
        const topics = await TopicRepository.findAll(classId);

        return await Promise.all(
            topics.map(async (topic) => {
                const subtopics = await SubTopicRepository.findAll(topic.id);
                return {
                    name: topic.name,
                    classId: topic.classId,
                    SubTopic: subtopics.map((subtopic) => ({
                        name: subtopic.name,
                        topicId: subtopic.topicId,
                        description: subtopic.description,
                        imageUrl: subtopic.imageUrl,
                        videoUrl: subtopic.videoUrl,
                    })) as GetSubTopicResponse[],
                };
            })
        );
    }
}