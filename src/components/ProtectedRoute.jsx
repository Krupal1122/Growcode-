// pages/ProtectedRoute.jsx (artifact ID: a3f1e16d-17d4-4b23-a1a5-caa6306b654f)
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;