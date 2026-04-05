// ===================== React & Router ===================== //
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ===================== Hooks ===================== //
import {
  useLoading,
  useGoogleAuth,
  useSubmitAuth,
  useInputAnimation,
  usePasswordToggle,
} from "@hooks";

/*
  useSignUpLogic
  - Manage sign-up form state and handlers
  - Minimal and focused: formatting & sectioning only (no behavior changes)
*/

const ROLE_MAP = { craftsman: 1, instructor: 2, client: 3 };

export function useSignUpLogic() {
  // Router
  const navigate = useNavigate();

  // UI hooks
  const { handleFocus, handleBlur } = useInputAnimation();
  const { showPass, togglePass, inputType } = usePasswordToggle();
  const { loading, setLoading } = useLoading();
  const { submitAuth } = useSubmitAuth(setLoading);
  const { googleLoginOrSignUp } = useGoogleAuth();

  // Local state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ role: "", terms: "" });

  // Helpers
  const validateForm = () => {
    const errors = { role: "", terms: "" };
    let hasError = false;

    if (!role) {
      errors.role = "Please select a role";
      hasError = true;
    }
    if (!agreedTerms) {
      errors.terms = "You must agree to Terms of Use";
      hasError = true;
    }

    setErrorMsg(errors);
    return !hasError;
  };

  // Handlers
  const handleSignup = async () => {
    if (!validateForm()) return;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await submitAuth("signup", {
      name: `${firstName} ${lastName}`,
      email,
      password,
      role: ROLE_MAP[role],
    });
  };

  const handleGoogleSignup = async () => {
    if (!validateForm()) return;
    await googleLoginOrSignUp("googlesignup", ROLE_MAP[role]);
  };

  // Public API
  return {
    // states
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role,
    agreedTerms,
    showTerms,
    errorMsg,
    loading,
    showPass,
    inputType,

    // setters
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setRole,
    setAgreedTerms,
    setShowTerms,
    setErrorMsg,

    // handlers
    handleFocus,
    handleBlur,
    togglePass,
    handleSignup,
    handleGoogleSignup,
    navigate,
  };
}
