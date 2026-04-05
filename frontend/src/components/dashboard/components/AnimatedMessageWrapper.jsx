import React, { useEffect, useState } from "react";

const AnimatedWrapper = ({ children, type }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setShow(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div
      className={`chat-message-wrapper ${type} ${show ? "show" : ""}`}
    >
      {children}
    </div>
  );
};

export default AnimatedWrapper;