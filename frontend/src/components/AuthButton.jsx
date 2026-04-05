import { ClipLoader } from "react-spinners";

const AuthButton = ({
  onClick,
  loading = false,
  disabled = false,
  type = "button",
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`auth-btn ${className}`}
      onClick={!loading ? onClick : undefined}
      disabled={disabled || loading}
    >
      {loading ? <ClipLoader size={25} color="white" /> : children}
    </button>
  );
};

export default AuthButton;
