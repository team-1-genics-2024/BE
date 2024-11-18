import {z, ZodType} from "zod";

export class CertificateValidation {

  static readonly CREATE : ZodType = z.object({
    userId: z.number({
      required_error: "User ID is required"
    }).int("User ID must be a positive number"),
    classId: z.number({
      required_error: "Class ID is required"
    }).int("Class ID must be a positive number"),
  });

  static readonly GET : ZodType = z.object({
    userId: z.number({
      required_error: "User ID is required"
    }).int("User ID must be a positive number"),
    classId: z.number({
      required_error: "Class ID is required"
    }).int("Class ID must be a positive number"),
  });

  static readonly GET_BY_USER : ZodType = z.object({
    userId: z.number({
      required_error: "User ID is required"
    }).int("User ID must be a positive number"),
  });
}