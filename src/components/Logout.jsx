// src/pages/Logout.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthStatus } from "../redux/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token from localStorage
    localStorage.removeItem("token");

    // Update auth state in Redux
    dispatch(setAuthStatus(false));

    // Redirect to login or home
    navigate("/");
  }, [dispatch, navigate]);

  return null; // No UI needed
};

export default Logout;
