import { Router } from "express";
import { TopicController } from "../controller/TopicController";
import { SubTopicController } from "../controller/SubTopicController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { IsMembershipMiddleware } from "../middleware/IsMembershipMiddleware";
import { RateLimiter } from "../middleware/RateLimiter";

export const topicRouter = Router()

topicRouter.post("/", RateLimiter.publicLimiter, AuthMiddleware, TopicController.create)
topicRouter.get("/:classId/", RateLimiter.publicLimiter, TopicController.getAllTopics)
topicRouter.post("/subtopic", RateLimiter.publicLimiter, AuthMiddleware, SubTopicController.create)
topicRouter.get("/subtopic/:subtopicId", RateLimiter.publicLimiter, AuthMiddleware, IsMembershipMiddleware, SubTopicController.getSubTopicById)
