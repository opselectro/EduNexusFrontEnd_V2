import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const AdminRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user.role.toUpperCase() === "ADMIN";

  return isAdmin ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default AdminRoute;
