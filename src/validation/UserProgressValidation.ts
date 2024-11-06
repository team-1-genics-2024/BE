import {z, ZodType} from "zod";

export class UserProgressValidation {

  static readonly CREATE : ZodType = z.object({
    userId : z.number({
      required_error: "User ID is required"
    }).int("User ID must be an integer"),
    subtopicId : z.number({
      required_error: "Subtopic ID is required"
    }).int("Subtopic ID must be an integer"),
    classId : z.number({
      required_error: "Class ID is required"
    }).int("Class ID must be an integer")
  });

}