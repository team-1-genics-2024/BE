import { MidtransClient } from "midtrans-node-client";
import dotenv from "dotenv";

dotenv.config();

export const snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});
