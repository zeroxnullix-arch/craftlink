import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  likePost,
  addComment,
  deleteComment,
  deletePost,
  updatePost,
} from "../controller/postController.js";

const postRouter = express.Router();

// Post routes
postRouter.post("/", authMiddleware, createPost);
postRouter.get("/", getAllPosts);
postRouter.get("/user/:userId", authMiddleware, getUserPosts);
postRouter.patch("/:postId", authMiddleware, updatePost);
postRouter.delete("/:postId", authMiddleware, deletePost);

// Like route
postRouter.patch("/:postId/like", authMiddleware, likePost);

// Comment routes
postRouter.post("/:postId/comment", authMiddleware, addComment);
postRouter.delete("/:postId/comment/:commentId", authMiddleware, deleteComment);

export default postRouter;
