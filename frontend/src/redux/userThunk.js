import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api"; // axios instance

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        "/api/user/changepassword",
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to change password"
      );
    }
  }
);
