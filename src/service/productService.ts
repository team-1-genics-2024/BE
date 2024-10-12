import { ProductPayment } from "../model/productModel";
import { snap } from "../config/payment";

export class productService {
  static async payment(data: ProductPayment) {
    if (!data.transaction_details || !data.customer_details) {
      throw new Error("Data not found");
    }

    const transaction = await snap.createTransaction(data);
    console.log(transaction);
    const transactionUrl = transaction.redirect_url;
    console.log(transaction);
    return transactionUrl;
    // return await data;
  }
}
