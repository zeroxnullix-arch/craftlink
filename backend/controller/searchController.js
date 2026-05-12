import axios from "axios";
import Course from "../model/courseModel.js";

export const smartSearchCourses = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.length < 2) {
      return res.json([]);
    }

    const courses = (await Course.find({ isPublished: true }).lean())
      .map(c => ({
        ...c,
        _id: c._id.toString()
      }));

    const response = await axios.post("https://craftlink-cfwv.vercel.app/search", {
      query,
      courses,
    });

    console.log("Flask response:", response.data.length);

    const ranked = response.data.map((item) => ({
      ...item.course,
      score: item.score,
    }));

    if (ranked.length === 0) {
      return res.json(courses.slice(0, 6));
    }

    res.json(ranked);

  } catch (err) {
    console.error("Search Error:", err.message);
    res.status(500).json({ message: "Search failed" });
  }
};