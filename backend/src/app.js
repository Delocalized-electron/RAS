import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middleware configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN.replace(/['"]+/g, ""),
    credentials: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import stockRouter from "./routes/stock.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/stocks", stockRouter);

export { app };
