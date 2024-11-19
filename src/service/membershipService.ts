import {
  CreateMembershipRequest,
  CreateMembershipResponse,
  UpdateMembershipResponse,
} from "../model/membershipModel";
import { MembershipRepository } from "../repository/mebershipRepository";

export class MembershipService {
  static async create(
    req: number
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

  static async getAll() {
    return await MembershipRepository.getAll();
  }

  static async getRemaining(id: number) {
    const membership = await MembershipRepository.findByUserId(id);
    if (!membership) {
      throw new Error("Membership not found");
    }
    
    const currentDate = new Date();
    const endDate = new Date(membership.endDate);
    const differenceInTime = endDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); 

    return {
      userId: membership.userId,
      remainingDays: remainingDays,
      currentDate: currentDate,
    };
  }
}
