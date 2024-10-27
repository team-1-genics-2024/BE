import db from "../config/database";
import { Payment } from "@prisma/client";
import {
  PaymentNotificationResponse,
  PaymentPayload,
  PaymentReq,
} from "../model/paymentModel";

const database = db;

export class PaymentRepository {
  static async create(payment: PaymentPayload): Promise<Payment> {
    const paymentReq: PaymentReq = {
      id: payment.transaction_details.order_id,
      userId: payment.customer_details.userId,
      amount: payment.transaction_details.gross_amount,
      date: new Date(),
    };
    return await database.payment.create({
      data: paymentReq,
    });
  }

  static async update(
    id: string,
    data: PaymentNotificationResponse
  ): Promise<Payment> {
    const payment = {
      method: data.payment_type,
      date: new Date(data.transaction_time),
      status: data.transaction_status,
    };

    return await database.payment.update({
      where: { id },
      data: payment,
    });
  }

  static async getAll(): Promise<Payment[]> {
    return await database.payment.findMany();
  }
}
