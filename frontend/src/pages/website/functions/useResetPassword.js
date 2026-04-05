import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useInputAnimation,
    usePasswordToggle,
    useOTP,
    useLoading,
} from "@hooks";

import {
    maskEmail,
    sendOtpRequest,
    verifyOtpRequest,
    resetPasswordRequest,
} from "@hooks/resetPassword";

/**
 * Hook: useResetPasswordLogic
 */
export function useResetPasswordLogic() {
    // ----- UI helpers -----
    const { handleFocus, handleBlur } = useInputAnimation();
    const { showPass, togglePass, inputType } = usePasswordToggle();
    const { timer, canResend, resetTimer } = useOTP();
    const { loading, setLoading } = useLoading();
    const navigate = useNavigate();

    // ----- Local state -----
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    // ----- Handlers (wrappers) -----
    const sendOtp = () =>
        sendOtpRequest(email, setLoading, setStep);

    const verifyOtp = () =>
        verifyOtpRequest(email, otp, setLoading, setStep);

    const resetPassword = () =>
        resetPasswordRequest(
            email,
            newPass,
            confirmPass,
            setLoading,
            navigate
        );

    // ----- Public API -----
    return {
        // States
        step,
        email,
        otp,
        newPass,
        confirmPass,
        loading,
        showPass,
        inputType,
        timer,
        canResend,

        // Setters
        setEmail,
        setOtp,
        setNewPass,
        setConfirmPass,
        setStep,

        // UI handlers
        handleFocus,
        handleBlur,
        togglePass,

        // Actions
        sendOtp,
        verifyOtp,
        resetPassword,
        resetTimer,

        // Utils
        maskEmail,
        navigate,
    };
}
