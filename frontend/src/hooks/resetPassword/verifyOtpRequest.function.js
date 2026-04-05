import { toast } from "react-toastify";
import { api } from "@services/api";
export const verifyOtpRequest = async (email, otp, setLoading, setStep) => {
    if (!otp) return toast.error("Enter OTP");
    setLoading(true);
    try {
        const res = await api.post(
            "/api/auth/verifyotp",
            { email, otp },
            { withCredentials: true }
        );
        toast.success(res.data?.message || "OTP verified successfully");
        setStep(3);
    } catch (err) {
        toast.error(
            err.response?.data?.message || "Something went wrong, try again"
        );
    } finally {
        setLoading(false);
    }
};