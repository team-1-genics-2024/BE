import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import { PaymentService } from "../service/paymentService";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import {
  PaymentNotificationResponse,
  PaymentPayload,
} from "../model/paymentModel";
import { AuthRequest } from "../model/AuthModel";
import { UserRepository } from "../repository/UserRepository";

export const paymentController = {
  async payment(req: Request, res: Response) {
    try {
      const paymentReq = req.body as PaymentPayload;
      const user  = req as AuthRequest;
      const userId = user.user.id;
      paymentReq.transaction_details.order_id = uuidv4();

      const me = await UserRepository.findById(userId)
      if (!me) {
        throw new ResponseError(404, "User not found");
      }

      if (!paymentReq.customer_details) {
        paymentReq.customer_details = {
          first_name: me.name,
          email: me.email,
          userId: userId,
        }
      }

      const paymentRes = await PaymentService.payment(paymentReq);

      successResponse(res, StatusCodes.OK, "Payment success", paymentRes);
    } catch (error) {
      if (error instanceof Error) {
        errorResponse(res, error);
      } else {
        errorResponse(
          res,
          new ResponseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
          )
        );
      }
    }
  },

  async notification(req: Request, res: Response, next: NextFunction) {
    try {
      const transactionRes: PaymentNotificationResponse =
        req.body as PaymentNotificationResponse;

      console.log(transactionRes);
      await PaymentService.paymentSuccess(transactionRes);
      //   console.log(req.body);
      // const paymentReq = req.body as PaymentReq;
      // const paymentRes = await PaymentService.notification(paymentReq);

      successResponse(res, StatusCodes.OK, "Notification success");
    } catch (error) {
      if (error instanceof Error) {
        errorResponse(res, error);
      } else {
        errorResponse(
          res,
          new ResponseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
          )
        );
      }
      next(error);
    }
  },
};
