export interface CreateSubTopicRequest {
    name: string;
    topicId: number;
    description: string;
    imageUrl: string;
    videoUrl: string;
}

export interface GetSubTopicResponse {
    name: string;
    topicId: number;
    description: string;
    imageUrl: string;
    videoUrl: string;
}