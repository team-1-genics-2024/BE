import {
  CreateUserProgressRequest,
  CreateUserProgressResponse,
} from "../model/UserProgressModel";
import { UserProgressRepository } from "../repository/UserProgressRepository";
import { UserRepository } from "../repository/UserRepository";
import { SubTopicRepository } from "../repository/SubTopicRepository";
import { ClassRepository } from "../repository/ClassRepository";
import { ResponseError } from "../error/ResponseError";
import { StatusCodes } from "http-status-codes";
import { Validation } from "../utils/validation";
import { UserProgressValidation } from "../validation/UserProgressValidation";

export class UserProgressService {
  
  static async createUserProgress(request: CreateUserProgressRequest): Promise<CreateUserProgressResponse> {
    console.log(request);
    const data = Validation.validation(UserProgressValidation.CREATE, request);

    const user = await UserRepository.findById(data.userId);

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "User not found");
    }

    const classData = await ClassRepository.findById(data.classId);

    if (!classData) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "Class not found");
    }

    const subtopic = await SubTopicRepository.findById(data.subtopicId);
    
    if (!subtopic) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "Subtopic not found");
    }

    const topics = classData.topics;

    const topicIds = topics.map(topic => topic.id);

    if (!topicIds.includes(subtopic.topicId)) {
      throw new ResponseError(StatusCodes.BAD_REQUEST, "Subtopic not found in class");
    }

    const userProgressExists = await UserProgressRepository.findByUserIdAndSubtopicId(data.userId, data.subtopicId);

    if (userProgressExists.length) {
      throw new ResponseError(StatusCodes.CONFLICT, "Already completed this subtopic");
    }

    const userProgress = await UserProgressRepository.create(data.userId, data.subtopicId, data.classId);

    return {
      userId: userProgress.userId,
      subtopicId: userProgress.subtopicId,
      classId: userProgress.classId,
    }
  }
}
