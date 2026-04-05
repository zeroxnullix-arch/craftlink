import { createSlice } from "@reduxjs/toolkit";
const courseSlice = createSlice({
  name: "course",
  initialState: {
    creatorCourseData: {},
    courseData: {},
    selectedCourse: null,
    lastUpdated: {},
  },
  reducers: {
    setCreatorCourseData: (state, action) => {
      const { userId, courses } = action.payload;
      state.creatorCourseData[userId] = {
        courses,
        lastUpdated: Date.now(),
      };
    },
   setCourseData: (state, action) => {
  const courses = action.payload;

  courses.forEach((course) => {
    state.courseData[course._id] = course;
    state.lastUpdated[course._id] = Date.now();
  });
},
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    clearCreatorCourseData: (state, action) => {
      const userId = action.payload;
      if (userId) {
        delete state.creatorCourseData[userId];
        delete state.lastUpdated[userId];
      }
    },
    clearCourseData: (state, action) => {
      const courseId = action.payload;
      if (courseId) {
        delete state.courseData[courseId];
        delete state.lastUpdated[courseId];
      }
    },
  },
});
export const {
  setCreatorCourseData,
  setCourseData,
  setSelectedCourse,
  clearCreatorCourseData,
  clearCourseData
} = courseSlice.actions;
export default courseSlice.reducer;
