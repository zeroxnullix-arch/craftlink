import { createSlice } from "@reduxjs/toolkit";
import { changePassword } from "./userThunk";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    userCache: {},
    loading: false,
    error: null,
    successMessage: null
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    setUserCache: (state, action) => {
      const { userId, user } = action.payload;
      state.userCache[userId] = {
        user,
        lastUpdated: Date.now(),
      };
    },
    logout: (state) => {
      state.userData = null;
      state.loading = false;
      localStorage.removeItem("userData");
    },
    clearUserMessage: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload?.message || "Password changed successfully";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to change password";
      });
  },
});
export const { setUserData, logout, clearUserMessage, setUserCache } =
  userSlice.actions;
export default userSlice.reducer;
