import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SubTopicRepository } from "../repository/SubTopicRepository";
import { CreateSubTopicRequest } from "../model/SubTopicModel";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { SubTopicService } from "../service/SubTopicService";

export class SubTopicController {
    static async create(req: Request, res: Response) {
        try {
            const topicReq = req.body as CreateSubTopicRequest
            const topicRes = await SubTopicService.CreateSubTopic(topicReq)

            successResponse(res, StatusCodes.CREATED, "topic created successfully", topicRes)
        }catch (error){
            if (error instanceof Error) {
                errorResponse(res, error);
              } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
              }
        }
    };

    static async getAllSubTopics(req: Request, res: Response) {
        try {
            var { topicId } = req.params
            const subtopics = await SubTopicService.GetAllSubTopics(Number(topicId))
            successResponse(res, StatusCodes.OK, "Topics retrieved successfully", subtopics);
        } catch (error) {
            if (error instanceof Error) {
                errorResponse(res, error);
            } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
            }
        }
    }
}