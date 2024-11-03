import { GetSubTopicResponse } from "./SubTopicModel";

export interface CreateTopicRequest {
    name: string;
    classId: number;
}

export interface GetTopicResponse {
    name: string;
    classId: number;
    SubTopic?: GetSubTopicResponse[];
}
