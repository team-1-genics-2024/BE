export interface Result {
    id: number;
    userId: number;
    quizId: number;
    topicId: number;
    classId: number;
    score: number;
}

export interface GetAllResultsResponse {
    results: Result[]
}

export interface GetResultResponse {
    result: Result
}