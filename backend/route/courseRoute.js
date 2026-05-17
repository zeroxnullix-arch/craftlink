import express from "express";
import {
  createCourse,
  createLecture,
  editCourse,
  getCourseById,
  getCreatorCourses,
  getPublishedCourses,
  removeCourse,
  removeLecture,
  editLecture,
  getCourseLecture,
  getCreatorById,
  togglePublishCourse,
  getInstructorCourses,
  getInstructorSales,
  getLectureComments,
  addLectureComment,
  getCourseReviews,
  addCourseReview,
} from "../controller/courseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const courseRouter = express.Router();
courseRouter.post("/create", authMiddleware, createCourse);
courseRouter.patch("/publish/:courseId", authMiddleware, togglePublishCourse);
courseRouter.get("/instructor/:userId", authMiddleware, getInstructorCourses);
courseRouter.get("/sales", authMiddleware, getInstructorSales);
courseRouter.get("/getpublished", getPublishedCourses);
courseRouter.get("/getcreator", authMiddleware, getCreatorCourses);
courseRouter.post("/editcourse/:courseId", authMiddleware, editCourse);
courseRouter.get("/getcourse/:courseId", getCourseById);
courseRouter.delete("/remove/:courseId", authMiddleware, removeCourse);
courseRouter.post("/createlecture/:courseId", authMiddleware, createLecture);
courseRouter.get("/courselecture/:courseId", authMiddleware, getCourseLecture);
courseRouter.put("/editlecture/:lectureId", authMiddleware, editLecture);
courseRouter.delete("/removelecture/:lectureId", authMiddleware, removeLecture);
courseRouter.get("/lecture/:lectureId/comments", getLectureComments);
courseRouter.post("/lecture/:lectureId/comments", authMiddleware, addLectureComment);
courseRouter.post("/creator", authMiddleware, getCreatorById);
courseRouter.get("/:courseId/reviews", getCourseReviews);
courseRouter.post("/:courseId/reviews", authMiddleware, addCourseReview);

export default courseRouter;
