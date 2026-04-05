import { useState, useEffect } from "react";
export const useOTP = (initialTime = 300) => {
  const [timer, setTimer] = useState(initialTime);
  const [canResend, setCanResend] = useState(false);
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else setCanResend(true);
    return () => clearInterval(interval);
  }, [timer]);
  const resetTimer = () => {
    setTimer(initialTime);
    setCanResend(false);
  };
  return { timer, canResend, resetTimer };
};
