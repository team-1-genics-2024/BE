import db from "../config/database";
import { Payment } from "@prisma/client";
import { PaymentPayload, PaymentReq } from "../model/paymentModel";

const database = db;

export class PaymentRepository {
  static async create(payment: PaymentPayload): Promise<Payment> {
    const paymentReq: PaymentReq = {
      userId: payment.customer_details.userId,
      amount: payment.transaction_details.gross_amount,
      method: "gopay",
      date: new Date(),
    };
    return await database.payment.create({
      data: paymentReq,
    });
  }
}
