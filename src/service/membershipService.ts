import {
  CreateMembershipRequest,
  CreateMembershipResponse,
  UpdateMembershipResponse,
} from "../model/membershipModel";
import { MembershipRepository } from "../repository/mebershipRepository";

export class MembershipService {
  static async create(
    req: CreateMembershipRequest
  ): Promise<CreateMembershipResponse> {
    const membershipReq = req;
    const membership = await MembershipRepository.create(membershipReq);
    return {
      id: membership.id,
      userId: membership.userId,
    };
    // return await MembershipRepository.create(membership);
  }

  static async updateByUserId(id: number): Promise<UpdateMembershipResponse> {
    const newMembership = await MembershipRepository.updateByUserId(id);
    return {
      userId: newMembership.userId,
      isActive: newMembership.isActive,
      endDate: newMembership.endDate,
    };
  }

  static async getById(id: number) {
    return await MembershipRepository.getById(id);
  }
}
