import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api.js";

const initialState = {
  isAuthenticated: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const validateToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(setAuthStatus(false));
    return;
  }

  try {
    const { data } = await api.get("/user/validate-token", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setAuthStatus(!!data.isValid));
  } catch (error) {
    console.error("Token validation failed:", error);
    dispatch(setAuthStatus(false));
  }
};

export const { setAuthStatus } = authSlice.actions;
export default authSlice.reducer;
