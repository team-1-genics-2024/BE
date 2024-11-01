interface EnrolledClass {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
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
