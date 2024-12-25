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
import { ApiError } from "./utils/ApiError.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/stocks", stockRouter);

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    // Handle custom API errors
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }

  // Handle generic errors
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
  });
});
export { app };
