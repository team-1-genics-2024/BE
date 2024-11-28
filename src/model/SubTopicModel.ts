export interface CreateSubTopicRequest {
    name: string;
    topicId: number;
    description: string;
    imageUrl: string;
    videoUrl: string;
}

export interface CreateSubTopicResponse {
    name: string;
    topicId: number;
    description: string;
    imageUrl: string;
    videoUrl: string;
}

export interface GetSubTopicResponse {
    name: string;
    topicId: number;
    subtopicId: number;
    description: string;
    imageUrl: string;
    videoUrl: string;
    classId: number;
}