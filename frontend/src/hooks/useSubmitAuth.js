import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { api } from "@services/api";
export const useSubmitAuth = (setLoading) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitAuth = async (endpoint, payload) => {
    setLoading(true);
    try {
      const res = await api.post(
        `/api/auth/${endpoint}`,
        payload,
        { withCredentials: true }
      );
      dispatch(setUserData(res.data));
      toast.success(
        `${endpoint.includes("signup") ? "Signup" : "Login"} successful`
      );
      navigate("/profile");
    } catch (err) {
      console.log("Signup error response:", err.response);
      console.log("Signup error request:", err.request);
      console.log("Signup error message:", err.message);
      toast.error(err.response?.data?.message || "Auth failed");
    } finally {
      setLoading(false);
    }
  };
  return { submitAuth };
};
