import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthStatus } from "../redux/authSlice";
import api from "../utils/api";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true); // <-- Add loading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          dispatch(setAuthStatus(false));
          setLoading(false);
          return;
        }

        const response = await api.get("/user/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setAuthStatus(response.data.isValid));
      } catch (error) {
        dispatch(setAuthStatus(false));
      } finally {
        setLoading(false); // <-- Stop loading once check is complete
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) return null; // Or show a spinner/loading UI

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
