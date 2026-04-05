import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
/**
 * ProtectedRoute - Protected route for authentication and authorization checks
 * @param {ReactNode} children - Elements to display to authorized user
 * @param {Array<string>} allowedRoles - List of allowed roles (optional)
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  // Extract user data and rehydration state from Redux Store
  const user = useSelector((state) => state.user.currentUser);
  const isHydrated = useSelector((state) => state._persist?.rehydrated);
  // Wait for store to load before performing redirects
  if (!isHydrated) {
    return <div>Loading...</div>;
  }
  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/signup" replace />;
  }
  // Check user roles/permissions
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/not-allowed" replace />;
  }

  // Render children for authorized user
  return children;
}
