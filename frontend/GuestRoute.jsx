import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children, loading }) {
  const { userData } = useSelector((state) => state.user);

  if (loading) return <div>Loading...</div>;

  if (userData) return <Navigate to="/" replace />;

  return children;
}
