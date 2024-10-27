import { Router } from "express";
import { TopicController } from "../controller/TopicController";
import { SubTopicController } from "../controller/SubTopicController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const topicRouter = Router()

topicRouter.use(AuthMiddleware)

topicRouter.post("/",TopicController.create)
topicRouter.get("/:classId/topic", TopicController.getAllTopics)
topicRouter.post("/subtopic", SubTopicController.create)
topicRouter.get("/:topicId/subtopic", SubTopicController.getAllSubTopics)