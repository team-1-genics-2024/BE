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
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}
