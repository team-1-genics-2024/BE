export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface ProductPayment {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details: {
    name: string;
    email: string;
  };
}
