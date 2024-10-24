import "./config/env";
import express from "express";
import cors from "cors";
import requestip from "request-ip";
import cookieParser from "cookie-parser";

import { userRouter } from "./router/userRouter";
import { authRouter } from "./router/authRouter";
import { paymentRouter } from "./router/paymentRouter";

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(requestip.mw());

app.use("/api/users", userRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT_SERVER || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT_SERVER || 5000}`);
});
