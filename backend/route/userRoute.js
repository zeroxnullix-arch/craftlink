import express from "express"
import { getCurrentUser, updateProfile, changePassword, getPurchasedCourses, getUserById, getProgress, updateProgress } from "../controller/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
const userRouter = express.Router()
userRouter.get("/getcurrentuser", authMiddleware, getCurrentUser)
userRouter.get("/purchased", authMiddleware, getPurchasedCourses);
userRouter.get("/:id", authMiddleware, getUserById);
userRouter.get("/progress/:courseId", authMiddleware, getProgress);
userRouter.post("/progress", authMiddleware, updateProgress);
userRouter.patch("/profile", authMiddleware,updateProfile)
userRouter.patch("/changepassword", authMiddleware, changePassword);

export default userRouter