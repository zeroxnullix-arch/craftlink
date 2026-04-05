import { toast } from "react-toastify";
import { api } from "@services/api";
export const resetPasswordRequest = async (
    email,
    newPass,
    confirmPass,
    setLoading,
    navigate
) => {
    if (!newPass || !confirmPass)
        return toast.error("Enter password");
    if (newPass !== confirmPass)
        return toast.error("Passwords do not match");
    setLoading(true);
    try {
        const res = await api.post(
            "/api/auth/resetpassword",
            { email, password: newPass },
            { withCredentials: true }
        );
        toast.success(res.data.message || "Password reset successfully");
        setTimeout(() => navigate("/signin"), 1200);
    } catch (err) {
        toast.error(
            err.response?.data?.message || "Something went wrong, try again"
        );
    } finally {
        setLoading(false);
    }
};
