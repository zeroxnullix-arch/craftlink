import express from "express";
import { createPayment,paymentCallback } from "../controller/paymentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const paymentRouter = express.Router();
paymentRouter.post("/create-payment", authMiddleware, createPayment);
paymentRouter.post("/callback", paymentCallback);

export default paymentRouter;
