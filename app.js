import express from "express";
import userRoute from "./routes/userRoute.js";
import todoRoute from "./routes/todoRoute.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMsg } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

// dot env config
config({
  path: "./data/config.env",
});

// middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Api path
app.use("/api/v1", userRoute);
app.use("/api/v1/user", todoRoute);

// Error msg
app.use(errorMsg);
