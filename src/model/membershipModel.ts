export interface CreateMembershipRequest {
  userId: number;
}

export interface CreateMembershipResponse {
  id: number;
  userId: number;
}

export interface UpdateMembershipRequest {
  userId: number;
}

export interface UpdateMembershipResponse {
  userId: number;
  isActive: boolean;
  endDate: Date;
}
