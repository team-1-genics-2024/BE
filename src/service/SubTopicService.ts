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
    static async GetSubTopicById(req: number): Promise<GetSubTopicResponse> {
        const subTopic = await SubTopicRepository.findSubTopicById(req);
        if (!subTopic) {
            throw new ResponseError(404, "Subtopic not found");
        }

        const classExist = await SubTopicRepository.findTopic(subTopic.topicId);
        if (!classExist) {
            throw new ResponseError(404, "Class not exists");
        }
    
        return {
            name: subTopic.name,
            topicId: subTopic.topicId,
            description: subTopic.description,
            imageUrl: subTopic.imageUrl,
            videoUrl: subTopic.videoUrl,
        };
    }
}