import { Router } from "express";
import { TopicController } from "../controller/TopicController";
import { SubTopicController } from "../controller/SubTopicController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { IsMembershipMiddleware } from "../middleware/IsMembershipMiddleware";

export const topicRouter = Router()

topicRouter.post("/", AuthMiddleware, TopicController.create)
topicRouter.get("/:classId/", TopicController.getAllTopics)
topicRouter.post("/subtopic", AuthMiddleware, SubTopicController.create)
topicRouter.get("/subtopic/:subtopicId", AuthMiddleware, IsMembershipMiddleware, SubTopicController.getSubTopicById)
