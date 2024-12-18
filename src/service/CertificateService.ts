import {
  GetCertificateRequest,
  GetCertificateResponse,
  GetCertificateByUserRequest,
  GetCertificateByUserResponse,
} from "../model/CertificateModel";
import { CertificateRepository } from "../repository/CertificateRepository";
import { ResponseError } from "../error/ResponseError";
import { StatusCodes } from "http-status-codes";
import { Validation } from "../utils/validation";
import { CertificateValidation } from "../validation/CertificateValidation";
import { UserRepository } from "../repository/UserRepository";
import { ClassRepository } from "../repository/ClassRepository";
import { EnrollRepository } from "../repository/EnrollRepository";
import { ResultRepository } from "../repository/ResultRepository";
import { v4 as uuid } from "uuid";

export class CertificateService {
  static async getCertificate(request: GetCertificateRequest): Promise<GetCertificateResponse> {
    const data = Validation.validation(CertificateValidation.GET, request);

    const user = await UserRepository.findById(data.userId);

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "User not found");
    }

    const classData = await ClassRepository.findById(data.classId);

    if (!classData) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "Class not found");
    }

    const isEnrolled = await EnrollRepository.findByUserIdAndClassId(data.userId, data.classId);

    if (!isEnrolled) {
      throw new ResponseError(StatusCodes.FORBIDDEN, "You are not enrolled in this class");
    }

    let certificate = await CertificateRepository.findByUserIdAndClassId(data.userId, data.classId);

    if (!certificate) {
      const result = await ResultRepository.getByUserIdAndClassId(data.userId, data.classId);

      if (!result) {
        throw new ResponseError(StatusCodes.FORBIDDEN, "You must complete the quiz to get certificate");
      }

      if (result.score < 70) {
        throw new ResponseError(StatusCodes.FORBIDDEN, "At least 70% score required to get certificate, please try again");
      }

      const certifID = `SPO'O-USER-${data.userId}-CLASS-${data.classId}-CERT-${uuid()}`;

      const newCertificate = await CertificateRepository.create(certifID, data.userId, data.classId);

      certificate = await CertificateRepository.findByUserIdAndClassId(newCertificate.userId, newCertificate.classId);

      if (!certificate) {
        throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error");
      }
    }

    return {
      certificate: certificate,
    };
  }

  static async getCertificateByUserId(request: GetCertificateByUserRequest): Promise<GetCertificateByUserResponse> {
    const data = Validation.validation(CertificateValidation.GET_BY_USER, request);

    const user = await UserRepository.findById(data.userId);

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "User not found");
    }

    const certificates = await CertificateRepository.findByUserId(data.userId);

    return {
      certificates: certificates || [],
    };
  }
}
