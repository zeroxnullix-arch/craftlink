import express from "express";
import {
  createConversation,
  sendMessage,
  getMessages,
  getUserConversations,
  markAsSeen,
  getUnreadCount,
  deleteMessage,
  deleteConversation
} from "../controller/MessageController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/conversation", authMiddleware, createConversation);
router.get("/conversation", authMiddleware, getUserConversations);
router.delete("/conversation/:conversationId", authMiddleware, deleteConversation);
router.get("/unread", authMiddleware, getUnreadCount);
router.patch("/seen/:conversationId", authMiddleware, markAsSeen);
router.post("/", authMiddleware, sendMessage);
router.delete("/:id", authMiddleware, deleteMessage);
router.get("/:conversationId", authMiddleware, getMessages);

export default router;
