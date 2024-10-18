import { z, ZodType } from 'zod';

export class SessionValidation {
  static readonly CREATE : ZodType = z.object({
    refreshToken : z.string({
      required_error: "Refresh token is required"
    }).min(1, "Refresh token must contain at least 1 character").max(500, "Refresh token cannot be longer than 500 characters"),
    userId: z.number({
      required_error: "User ID is required"
    }).int(),
    userAgent: z.string({
      required_error: "User agent is required"
    }).min(1, "User agent must contain at least 1 character").max(200, "User agent cannot be longer than 200 characters"),
    ipAddress: z.string({
      required_error: "IP address is required"
    }).min(1, "IP address must contain at least 1 character").max(200, "IP address cannot be longer than 200 characters"),
    lastActive: z.date({
      required_error: "Last active date is required"
    }),
    isTimedOut: z.boolean({
      required_error: "Is timed out is required"
    }),
    expiry: z.number({
      required_error: "Expiry is required"
    }).int(),
  });

  static readonly REFRESH_TOKEN : ZodType = z.object({
    refreshToken : z.string({
      required_error: "Refresh token is required"
    }).min(1, "Refresh token must contain at least 1 character").max(255, "Refresh token cannot be longer than 255 characters"),
    userAgent: z.string({
      required_error: "User agent is required"
    }).min(1, "User agent must contain at least 1 character").max(100, "User agent cannot be longer than 100 characters"),
    ipAddress: z.string({
      required_error: "IP address is required"
    }).min(1, "IP address must contain at least 1 character").max(100, "IP address cannot be longer than 100 characters"),
  });
}