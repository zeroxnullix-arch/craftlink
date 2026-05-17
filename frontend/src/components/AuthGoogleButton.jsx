import { ClipLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc";
const AuthGoogleButton = ({ onClick, loading, children }) => (
  <div className="g-btn-container">
    <button className="g-button" onClick={onClick} disabled={loading}>
      <FcGoogle className="g-logo" />
      {loading ? <ClipLoader size={25} color="white" /> : <span>{children}</span>}
    </button>
  </div>
);

export default AuthGoogleButton;

