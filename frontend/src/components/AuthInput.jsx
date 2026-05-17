import { useId } from "react";
import { useEffect, useRef } from "react";
const AuthInput = ({
  type = "text",
  value,
  onChange,
  label,
  Icon,
  onIconClick,
  handleFocus,
  handleBlur,
  className = "",
  textarea = false,
}) => {
  const id = useId();
  const inputRef = useRef();
  const handleFocusLocal = (e) => {
    const parent = inputRef.current?.parentNode;
    if (parent) {
      parent.classList.add("focus");
      parent.classList.add("not-empty");
    }
    handleFocus?.(e);
  };
  const handleBlurLocal = (e) => {
    const parent = inputRef.current?.parentNode;
    if (parent) {
      parent.classList.remove("focus");
      if (!value || value === "") {
        parent.classList.remove("not-empty");
      }
    }
    handleBlur?.(e);
  };
  useEffect(() => {
    const parent = inputRef.current?.parentNode;
    if (parent) {
      if (value && value !== "") {
        parent.classList.add("not-empty");
      } else {
        if (!parent.classList.contains("focus")) {
          parent.classList.remove("not-empty");
        }
      }
    }
  }, [value]);
  return (
    <div className={`input-wrap ${className}`}>
      {textarea ? (
        <textarea
          className="section-main-input"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          ref={inputRef}
          onFocus={handleFocusLocal}
          onBlur={handleBlurLocal}
          id={id}
        />
      ) : (
        <input
          className="section-main-input"
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={handleFocusLocal}
          onBlur={handleBlurLocal}
          id={id}
        />
      )}
      <label htmlFor={id}>{label}</label>
      {Icon && (
        <Icon
          className="icon"
          onClick={onIconClick}
          style={{ cursor: onIconClick ? "pointer" : "default" }}
        />
      )}
    </div>
  );
};

export default AuthInput;
