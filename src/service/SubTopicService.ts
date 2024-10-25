import { CreateSubTopicRequest, GetSubTopicResponse } from "../model/SubTopicModel";
import { ResponseError } from "../error/ResponseError";
import { SubTopicRepository } from "../repository/SubTopicRepository";

export class SubTopicService {
    static async CreateSubTopic (request: CreateSubTopicRequest): Promise<GetSubTopicResponse> {
        const topicExist = await SubTopicRepository.findTopic(request.topicId)

        if (topicExist == null) {
            throw new ResponseError(404, "Topic not exists")
        }

        const subTopicExist = await SubTopicRepository.findByName(request.name)

        if (subTopicExist) {
            throw new ResponseError(409, "Subtopic already exist")
        }

        const subTopic = await SubTopicRepository.createSubtopic(request.name, request.topicId, request.description, request.imageUrl, request.videoUrl)
        
        return {
            name: subTopic.name,
            topicId: subTopic.topicId,
            description: subTopic.description,
            imageUrl: subTopic.imageUrl,
            videoUrl: subTopic.videoUrl,
        }
    }
    static async GetAllSubTopics(req: number): Promise<GetSubTopicResponse[]> {
        const subTopics = await SubTopicRepository.findAll(req);
        
        const classExist = await SubTopicRepository.findTopic(req)

        if (classExist == null) {
            throw new ResponseError(404, "Class not exists");
        }

        return subTopics.map(subTopic => ({
            name: subTopic.name,
            topicId: subTopic.topicId,
            description: subTopic.description,
            imageUrl: subTopic.imageUrl,
            videoUrl: subTopic.videoUrl,
        }));
    }
}