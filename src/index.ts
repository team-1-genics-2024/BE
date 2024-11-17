import "./config/env";
import express from "express";
import cors from "cors";
import requestip from "request-ip";
import cookieParser from "cookie-parser";

import { userRouter } from "./router/userRouter";
import { authRouter } from "./router/authRouter";
import { paymentRouter } from "./router/paymentRouter";
import { membershipRouter } from "./router/membershipRouter";
import { topicRouter } from "./router/TopicRouter";
import { classRouter } from "./router/classRouter";
import { enrollRouter } from "./router/enrollRouter";
import { questionRouter } from "./router/QuestionRouter";
import { quizRouter } from "./router/QuizRouter";
import { resultRouter } from "./router/ResultRouter";
import { userProgressRouter } from "./router/progressRouter";
import { certificateRouter } from "./router/certificateRouter";

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
app.use("/api/membership", membershipRouter);
app.use("/api/topic", topicRouter);
app.use("/api/class", classRouter);
app.use("/api/enroll", enrollRouter);
app.use("/api/progress", userProgressRouter);
app.use("/api/question", questionRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/result", resultRouter);
app.use("/api/userProgress", userProgressRouter);
app.use("/api/certificate", certificateRouter);

const port = Number(process.env.PORT_SERVER) || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
