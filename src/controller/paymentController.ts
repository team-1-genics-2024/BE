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

export const paymentController = {
  async payment(req: Request, res: Response) {
    try {
      const paymentReq = req.body as PaymentPayload;
      paymentReq.transaction_details.order_id = uuidv4();

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
