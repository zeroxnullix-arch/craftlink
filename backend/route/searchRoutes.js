import express from "express";
import { smartSearchCourses } from "../controller/searchController.js";

const router = express.Router();

// 🔍 AI Search Route
router.post("/search", smartSearchCourses);

export default router;