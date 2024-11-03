export interface Class {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  totalTopics: number;
  totalSubtopics: number;
  totalParticipants: number;
  rating: number;
}

export interface GetClassByIdRequest {
  id: number;
}

export interface GetClassByIdResponse {
  class: Class;
}

export interface SearchClassRequest {
  keyword: string;
}

export interface SearchClassResponse {
  classes: Class[];
}

export interface GetAllClassResponse {
  classes: Class[];
}