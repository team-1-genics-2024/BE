import {
  PaymentNotificationResponse,
  PaymentPayload,
} from "../model/paymentModel";
import { snap } from "../config/payment";
import { ResponseError } from "../error/ResponseError";
import { PaymentRepository } from "../repository/paymentRepository";

export class PaymentService {
  static async payment(data: PaymentPayload) {
    if (!data.transaction_details || !data.customer_details) {
      throw new Error("Data not found");
    }

    const transaction = await snap.createTransaction(data);
    await PaymentRepository.create(data);
    console.log(transaction);
    const transactionUrl = transaction.redirect_url;
    console.log(transaction);
    return transactionUrl;
    // return await data;
  }

  static async paymentSuccess(data: PaymentNotificationResponse) {
    if (data.transaction_status !== "settlement") {
      throw new ResponseError(400, "Payment not settled");
    }

    const payment = await PaymentRepository.update(data.order_id, data);
    return payment;
  }
}
