import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: null,
  },
  reducers: {
    setAuthStatus(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const validateToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await api.get("/user/validate-token", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);

      dispatch(setAuthStatus(response.data.isValid));
    } catch (error) {
      console.error("Token validation failed:", error);
      dispatch(setAuthStatus(false));
    }
  } else {
    dispatch(setAuthStatus(false));
  }
};

export const { setAuthStatus } = authSlice.actions;
export default authSlice.reducer;
