import express from "express";
import {
    createPayment,
    paymentCallback,
    verifyPayment, getPaymentStatus, verifyPaymobTransaction
} from "../controller/paymentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const paymentRouter = express.Router();
paymentRouter.post("/create-payment", authMiddleware, createPayment);
paymentRouter.post("/verify-payment", authMiddleware, verifyPayment);
paymentRouter.get("/payment-status/:orderId", authMiddleware, getPaymentStatus);
paymentRouter.post("/verify-transaction", authMiddleware, verifyPaymobTransaction);
paymentRouter.post("/callback", paymentCallback);

export default paymentRouter;
