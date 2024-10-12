import "./config/env";
import express from "express";
import cors from "cors";
import requestip from "request-ip";
import cookieParser from "cookie-parser";

import { userRouter } from "./router/userRouter";
import { authRouter } from "./router/authRouter";

const app = express();

app.use(cookieParser())

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(requestip.mw())

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});