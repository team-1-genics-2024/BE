import "../config/envConfig";
import express from "express";
import cors from "cors";

import { userRouter } from "./router/userRouter";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("--- Hello World! ---");
});

app.use("/api/user", userRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
