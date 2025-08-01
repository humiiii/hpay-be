import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthStatus } from "../redux/authSlice";
import api from "../utils/api";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          dispatch(setAuthStatus(false));
          return;
        }

        const { data } = await api.get("/user/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setAuthStatus(data.isValid));
      } catch {
        dispatch(setAuthStatus(false));
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) return null; 

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
