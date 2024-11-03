import {z, ZodType} from "zod";

export class RatingValidation {
    static readonly CREATE : ZodType = z.object({
      userId : z.number({
        required_error: "User ID is required"
      }).int(),
      classId : z.number({
        required_error: "Class ID is required"
      }).int(),
      rating : z.number({
        required_error: "Rating is required"
      }).int().min(1, "Rating must be at least 1").max(5, "Rating cannot be more than 5")
    });
  }