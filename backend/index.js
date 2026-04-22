import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import authRouter from "./route/authRoute.js";
import userRouter from "./route/userRoute.js";
import courseRouter from "./route/courseRoute.js";
import paymentRouter from "./route/paymentRouter.js";
import withdrawRouter from "./route/withdrawRouter.js";
import messageRouter from "./route/messageRoute.js";
import postRouter from "./route/postRoute.js";
import paymentWebhook from "./route/paymentWebhook.js";
import { initializeSocket } from "./sockets/index.js";
dotenv.config();
const app = express();
const port = Number(process.env.PORT) || 8000;
app.use(express.json());
app.use(cookieParser());
// const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
//   .split(",")
//   .map((s) => s.trim())
//   .filter(Boolean);
// app.use(
//   cors({
//     origin: (origin, cb) => {
//       if (!origin) return cb(null, true);
//       if (allowedOrigins.includes(origin)) return cb(null, true);
//       return cb(new Error("CORS not allowed"), false);
//     },
//     credentials: true,
//   })
// );
app.use(cors({
  origin: true,
  credentials: true
}));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/payment", paymentWebhook);
app.use("/api/withdrawal", withdrawRouter);
app.use("/api/message", messageRouter);
app.use("/api/post", postRouter);
app.get("/", (req, res) => res.send("Server Running 🚀"));
const server = http.createServer(app);
const io = new Server(server, {
  // cors: {
  //   origin: allowedOrigins,
  //   credentials: true,
  // },
    cors: {
    origin: true,
    credentials: true,
  },
});
app.set("io", io);
initializeSocket(io);
const startServer = async () => {
  try {
    await connectDb();
    console.log("DB Connected");
    server.listen(port, "0.0.0.0", () => {
      console.log(`Server Running On Port ${port}`);
    });
    const shutdown = async (signal) => {
      console.log(`Received ${signal}`);
      server.close(() => {
        mongoose.connection.close(false, () => {
          process.exit(0);
        });
      });
    };
    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (err) {
    console.error("DB Failed", err);
    process.exit(1);
  }
};
startServer();