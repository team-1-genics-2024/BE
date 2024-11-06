export interface UserProgress {
  userId: number;
  subtopicId: number;
  classId: number;
}

export interface CreateUserProgressRequest {
  userId: number;
  subtopicId: number;
  classId: number;
}

export interface CreateUserProgressResponse {
  userId: number;
  subtopicId: number;
  classId: number;
}