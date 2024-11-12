export interface Quiz{
    id: number;
    name: string;
    totalMarks: number;
    classId: number;
}

export interface GetAllQuizResponse {
    quizzes: Quiz[];
}

export interface GetQuizResponse {
    quiz: Quiz;
} 
