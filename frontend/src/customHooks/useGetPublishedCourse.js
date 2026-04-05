import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice";
import { api } from "@services/api";
// ===================== Custom Hook: Fetch Published Courses ===================== //
/**
 * useGetPublishedCourse - Fetches all published courses from the backend on mount
 * and syncs them with Redux. No authentication required.
 * 
 * @returns {void}
 */
const useGetPublishedCourse = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCourseData = async () => {
      try {
        // Fetch public published courses (no token required)
        const result = await api.get(`/api/course/getpublished`);
        dispatch(setCourseData(result.data));
        console.log("Published courses fetched:", result.data);
      } catch (error) {
        console.error("Error fetching published courses:", error.message);
      }
    };
    getCourseData();
  }, [dispatch]);
};
export default useGetPublishedCourse;
