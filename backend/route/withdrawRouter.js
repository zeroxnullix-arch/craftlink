import express from "express";
import {
  getInstructorEarnings,
  requestWithdrawal,
  getWithdrawalHistory,
  getDashboardStats,
  getAllWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
  completeWithdrawal,
  getAllUsers,
  toggleUserStatus,
} from "../controller/withdrawController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const withdrawRouter = express.Router();

// Instructor routes
withdrawRouter.get("/earnings", authMiddleware, getInstructorEarnings);
withdrawRouter.post("/request", authMiddleware, requestWithdrawal);
withdrawRouter.get("/history", authMiddleware, getWithdrawalHistory);

// Admin routes
withdrawRouter.get("/admin/dashboard-stats", authMiddleware, getDashboardStats);
withdrawRouter.get("/admin/withdrawals", authMiddleware, getAllWithdrawals);
withdrawRouter.post("/admin/approve/:withdrawalId", authMiddleware, approveWithdrawal);
withdrawRouter.post("/admin/reject/:withdrawalId", authMiddleware, rejectWithdrawal);
withdrawRouter.post("/admin/complete/:withdrawalId", authMiddleware, completeWithdrawal);
withdrawRouter.get("/admin/users", authMiddleware, getAllUsers);
withdrawRouter.post("/admin/toggle-user/:userId", authMiddleware, toggleUserStatus);

export default withdrawRouter;
