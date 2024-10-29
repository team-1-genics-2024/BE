import { Class } from "./ClassModel";

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
  classes: Class[];
}
