// Custom hook for handling user authentication (email/password & Google OAuth)
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { api } from "@services/api";
/**
 * useAuth
 *
 * Provides authentication logic for login via email/password and Google OAuth.
 * Handles API calls, Redux state updates, navigation, and user feedback.
 *
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @param {Function} setLoading - State setter for loading indicator
 * @returns {Object} { loading, handleLogin, googleLogin }
 */
export default function useAuth(email, password, setLoading) {
  // Redux dispatch for updating user state
  const dispatch = useDispatch();
  // React Router navigation for redirecting after login
  const navigate = useNavigate();
  /**
   * handleLogin
   *
   * Handles user login with email and password.
   * - Validates input fields
   * - Calls backend API for authentication
   * - Updates Redux state with user data
   * - Shows success/error toasts and navigates on success
   */
  const handleLogin = useCallback(async () => {
    // Ensure both email and password are provided
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }
    setLoading(true);
    try {
      // Send login request to backend API
      const res = await api.post(
        `/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      // Store user data in Redux state
      dispatch(setUserData(res.data));
      toast.success("Login successful");
      // Redirect to profile page after successful login
      navigate("/profile");
    } catch (err) {
      // Show error message from backend or generic error
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }, [email, password, dispatch, navigate]);
  /**
   * googleLogin
   *
   * Handles user login via Google OAuth popup.
   * - Initiates Google sign-in
   * - Sends user info to backend for authentication/registration
   * - Updates Redux state and navigates on success
   * - Handles and displays errors
   */
  const googleLogin = useCallback(async () => {
    try {
      // Open Google sign-in popup
      const result = await signInWithPopup(auth, provider);
      // Send Google user info to backend for login/registration
      const res = await api.post(
        `/api/auth/googlelogin`,
        { name: result.user.displayName, email: result.user.email },
        { withCredentials: true },
      );
      // Store user data in Redux state
      dispatch(setUserData(res.data));
      toast.success("Google login successful");
      // Redirect to home page after successful login
      navigate("/");
    } catch (error) {
      // Show error message from backend, Firebase, or generic error
      toast.error(
        error.response?.data?.message || error.message || "Google login failed",
      );
    }
  }, [dispatch, navigate]);
  // Return loading state and authentication handlers
  return { loading, handleLogin, googleLogin };
}