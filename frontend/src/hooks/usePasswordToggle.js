import { useState } from "react";
export const usePasswordToggle = (initialState = false) => {
  const [showPass, setShowPass] = useState(initialState);
  const inputType = showPass ? "text" : "password";
  const togglePass = () => setShowPass((prev) => !prev);
  return { showPass, togglePass, inputType, setShowPass };
};
