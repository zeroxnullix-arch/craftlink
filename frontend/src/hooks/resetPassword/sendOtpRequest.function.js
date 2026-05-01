import { toast } from "react-toastify";
import { api } from "@services/api";
export const sendOtpRequest = async (email, setLoading, setStep) => {
    if (!email) return toast.error("Enter email");
    setLoading(true);
    try {
        const res = await api.post(
            "/api/auth/sendotp",
            { email },
            { withCredentials: false }
        );
        toast.success(res?.data?.message || "OTP sent successfully");
        setStep(2);
    } catch (err) {
        toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
        setLoading(false);
    }
};