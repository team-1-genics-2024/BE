import {z, ZodType} from "zod";

export class ClassValidation {

  static readonly SEARCH : ZodType = z.object({
    keyword : z.string({
      required_error: "Keyword is required"
    }).min(1, "Keyword must contain at least 1 character").max(255, "Keyword cannot be longer than 255 characters")
  });
}