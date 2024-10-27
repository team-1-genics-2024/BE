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
      throw new ResponseError(404, "Data not found");
    }
    const transaction = await snap.createTransaction(data);
    await PaymentRepository.create(data);

    const transactionUrl = transaction.redirect_url;
    return transactionUrl;
    // return await data;
  }

  static async paymentSuccess(data: PaymentNotificationResponse) {
    return await PaymentRepository.update(data.order_id, data);
  }

  static async getAll() {
    return await PaymentRepository.getAll();
  }

}
