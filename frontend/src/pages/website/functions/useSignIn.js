import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useInputAnimation,
  usePasswordToggle,
  useLoading,
  useGoogleAuth,
  useSubmitAuth,
} from "@hooks";

/**
 * Hook: useSignInLogic
 * - Provides state and handlers for the Sign In page
 * - Keeps implementation minimal and focused; no behavior changes
 */
export function useSignInLogic() {
  // ----- Routing + cross-cutting hooks -----
  const navigate = useNavigate();

  // ----- UI helpers -----
  const { handleFocus, handleBlur } = useInputAnimation();
  const { showPass, togglePass, inputType } = usePasswordToggle();
  const { loading, setLoading } = useLoading();
  const { googleLoginOrSignUp } = useGoogleAuth();
  const { submitAuth } = useSubmitAuth(setLoading);

  // ----- Local state -----
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ----- Handlers -----
  const handleLogin = async () => {
    if (!email || !password) return toast.warn("Fill all fields");
    await submitAuth("login", { email, password });
  };

  // ----- Public API -----
  return {
    // States
    email,
    password,
    loading,
    showPass,
    inputType,

    // Setters
    setEmail,
    setPassword,

    // Handlers
    handleFocus,
    handleBlur,
    togglePass,
    handleLogin,
    googleLoginOrSignUp,
    navigate,
  };
}
