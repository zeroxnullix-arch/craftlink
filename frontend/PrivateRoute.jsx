// ===================== Imports ===================== //
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "@redux/userSlice";
import LoadingFire from "@components/LoadingFire";
// ===================== Protected Route Guard ===================== //
/**
 * PrivateRoute - Route guard component for protected pages
 * - Checks if user is authenticated
 * - Validates user role against allowedRoles (if provided)
 * - Handles cross-tab logout via storage events
 * 
 * @param {ReactNode} children - Content to render if authorized
 * @param {Array<number>} allowedRoles - Optional array of allowed role IDs
 * @returns {ReactNode} Protected content or redirect to signin/home
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  // ===== Redux State =====
  const { userData, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ===== Logout Sync Across Tabs =====
  // Listen for logout events from other tabs via localStorage
  useEffect(() => {
    const handleLogout = (e) => {
      if (e.key === "logout") {
        dispatch(logout()); // Clear userData from Redux
        navigate("/signin", { replace: true });
      }
    };

    window.addEventListener("storage", handleLogout);
    return () => window.removeEventListener("storage", handleLogout);
  }, [dispatch, navigate]);

  // ===== Guard Checks =====
  // Show loading state while fetching user data
  if (loading) {
    return <LoadingFire/>
  }

  // Redirect to signin if not authenticated
  if (!userData) {
    return <Navigate to="/signin" replace />;
  }

  // Redirect to home if role is not allowed
  if (allowedRoles && !allowedRoles.includes(userData.role)) {
    return <Navigate to="/" replace />;
  }

  // Render protected content
  return children;
}
