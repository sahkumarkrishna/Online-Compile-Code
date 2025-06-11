// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("userRole");

  if (!isLoggedIn) {
    // Not logged in, redirect to login or home
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is provided, check if user's role is included
  if (allowedRoles && Array.isArray(allowedRoles) && !allowedRoles.includes(role)) {
    // Unauthorized for this role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
