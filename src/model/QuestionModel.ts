export interface Question {
    id: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAns: string;
    marks: number;
    quizId: number;
}

export interface GetAllQuestionsRequest {
    userId: number;
    quizId: number;
    classId: number;
}

export interface GetAllQuestionsResponse {
    questions: Question[]
}

export interface GetQuestionResponse {
    question: Question
}
