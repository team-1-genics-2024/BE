import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TopicService } from "../service/TopicService";
import { CreateTopicRequest } from "../model/TopicModel";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";

export class TopicController {
    static async create(req: Request, res: Response) {
        try {
            const topicReq = req.body as CreateTopicRequest
            const topicRes = await TopicService.CreateTopic(topicReq)

            successResponse(res, StatusCodes.CREATED, "topic created successfully", topicRes)
        }catch (error){
            if (error instanceof Error) {
                errorResponse(res, error);
              } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
              }
        }
    };

    static async getAllTopics(req: Request, res: Response) {
        try {
            var { classId } = req.params
            const topics = await TopicService.GetAllTopics(Number(classId))
            successResponse(res, StatusCodes.OK, "Topics retrieved successfully", topics);
        } catch (error) {
            if (error instanceof Error) {
                errorResponse(res, error);
            } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
            }
        }
    }
}