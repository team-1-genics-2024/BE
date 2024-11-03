import {
  EnrollRequest,
  EnrollResponse,
  GetEnrolledClassRequest,
  GetEnrolledClassResponse,
} from "../model/EnrollModel";
import { EnrollRepository } from "../repository/EnrollRepository";
import { ClassRepository } from "../repository/ClassRepository";
import { UserRepository } from "../repository/UserRepository";
import { ResponseError } from "../error/ResponseError";
import { StatusCodes } from "http-status-codes";
import { Validation } from "../utils/validation";
import { EnrollValidation } from "../validation/EnrollValidation";
import { ParticipantService } from "./ParticipantService";

export class EnrollService {
  static async enrollUser(request: EnrollRequest): Promise<EnrollResponse> {
    const data = Validation.validation(EnrollValidation.ENROLL, request);

    const user = await UserRepository.findById(data.userId);
  
    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "User not found");
    }

    const classData = await ClassRepository.findById(data.classId);

    if (!classData) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "Class not found");
    }

    const enrollExists = await EnrollRepository.findByUserIdAndClassId(data.userId, data.classId);

    if (enrollExists) {
      throw new ResponseError(StatusCodes.CONFLICT, "Already enrolled in this class");
    }

    const enroll = await EnrollRepository.create(data.userId, data.classId);

    await ParticipantService.incrementParticipantCount(data.classId);

    return {
      userId: enroll.userId,
      classId: enroll.classId,
    };
  }

  static async getEnrolledClass(request: GetEnrolledClassRequest): Promise<GetEnrolledClassResponse> {
    const data = Validation.validation(EnrollValidation.GET_ENROLLED_CLASS, request);

    const user = await UserRepository.findById(data.userId);

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "User not found");
    }

    const enrolls = await EnrollRepository.findByUserId(data.userId);

    if (!enrolls.length) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "No class enrolled");
    }

    const classes = enrolls.map(enroll => enroll.class);

    return {
      classes,
    };
  }
}
