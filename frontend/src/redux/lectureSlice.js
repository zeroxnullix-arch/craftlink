import { createSlice } from "@reduxjs/toolkit";
const lectureSlice = createSlice({
  name: "lecture",
  initialState: {
    lectureData: {},
    lastUpdated: {},
  },
  reducers: {
    setLectureData: (state, action) => {
      const { courseId, lectures } = action.payload;
      state.lectureData[courseId] = lectures;
      state.lastUpdated[courseId] = Date.now();
    },
    clearLectureData: (state, action) => {
      const courseId = action.payload;
      if (courseId) {
        delete state.lectureData[courseId];
        delete state.lastUpdated[courseId];
      }
    },
  },
});
export const { setLectureData, clearLectureData } = lectureSlice.actions;
export default lectureSlice.reducer;
