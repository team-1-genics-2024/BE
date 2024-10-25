import { Router } from "express";
import { TopicController } from "../controller/TopicController";
import { SubTopicController } from "../controller/SubTopicController";

export const topicRouter = Router()

topicRouter.post("/", TopicController.create)
topicRouter.get("/:classId/topic", TopicController.getAllTopics)
topicRouter.post("/subtopic", SubTopicController.create)
topicRouter.get("/:topicId/subtopic", SubTopicController.getAllSubTopics)