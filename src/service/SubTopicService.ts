import { CreateSubTopicRequest, GetSubTopicResponse } from "../model/SubTopicModel";
import { ResponseError } from "../error/ResponseError";
import { SubTopicRepository } from "../repository/SubTopicRepository";
import { EnrollRepository } from "../repository/EnrollRepository";
import { AuthRequest } from "../model/AuthModel";
import { StatusCodes } from "http-status-codes";
import { StorageUtils } from "../utils/storage-utils";

export class SubTopicService {
    static async CreateSubTopic (request: CreateSubTopicRequest): Promise<GetSubTopicResponse> {
        const topicExist = await SubTopicRepository.findTopic(request.topicId)

        if (topicExist == null) {
            throw new ResponseError(StatusCodes.NOT_FOUND, "Topic not exists")
        }

        const subTopicExist = await SubTopicRepository.findByName(request.name)

        if (subTopicExist) {
            throw new ResponseError(StatusCodes.CONFLICT, "Subtopic already exist")
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
    static async GetSubTopicById(auth: AuthRequest, req: number): Promise<GetSubTopicResponse> {
        const subTopic = await SubTopicRepository.findById(req);
        if (!subTopic) {
            throw new ResponseError(StatusCodes.NOT_FOUND, "Subtopic not found");
        }

        const classExist = await SubTopicRepository.findTopic(subTopic.topicId);

        if (!classExist) {
            throw new ResponseError(StatusCodes.NOT_FOUND, "Class not exists");
        }

        const isEnrolled = await EnrollRepository.findByUserIdAndClassId(auth.user.id, classExist.classId);

        if (!isEnrolled) {
            throw new ResponseError(StatusCodes.FORBIDDEN, "You not enrolled in this class");
        }

        const url = await StorageUtils.getSignedUrl(subTopic.videoUrl);
    
        return {
            name: subTopic.name,
            topicId: subTopic.topicId,
            description: subTopic.description,
            imageUrl: subTopic.imageUrl,
            videoUrl: url,
        };
    }
}