interface EnrolledClass {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  totalUserProgress: number;
  totalSubtopics: number;
}

export interface EnrollRequest {
  userId: number;
  classId: number;
}

export interface EnrollResponse {
  userId: number;
  classId: number;
}

export interface GetEnrolledClassRequest {
  userId: number;
}

export interface GetEnrolledClassResponse {
  classes: EnrolledClass[];
}

export interface SearchEnrolledClassRequest {
  userId: number;
  keyword: string;
}

export interface SearchEnrolledClassResponse {
  classes: EnrolledClass[];
}