export interface Rating {
  id: string;
  userId: number;
  classId: number;
  rating: number;
}

export interface CreateRatingRequest {
  userId: number;
  classId: number;
  rating: number;
}

export interface CreateRatingResponse {
  rating: Rating;
}
