import { z, ZodType } from 'zod';

export class EnrollValidation {
  static readonly ENROLL : ZodType = z.object({
    userId: z.number({
      required_error: "User ID is required"
    }).int(),
    classId: z.number({
      required_error: "Class ID is required"
    }).int(),
  });

  static readonly GET_ENROLLED_CLASS : ZodType = z.object({
    userId: z.number({
      required_error: "User ID is required"
    }).int(),
  });

  static readonly SEARCH_ENROLLED_CLASS : ZodType = z.object({
    userId: z.number({
      required_error: "User ID is required"
    }).int(),
    keyword: z.string({
      required_error: "Keyword is required"
    }).nonempty()
  });
}