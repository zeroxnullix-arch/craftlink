import { useMemo } from "react";
import { MdEmail, FaEye, FaEyeLowVision } from "@icons";
import {
  Header,
  AuthInput,
  AuthButton,
  AuthDivider,
  AuthGoogleButton,
  SideImg,
} from "@components";
import bg from "../../../assets/img/BgSignIn.jpg";
import { useSignInLogic } from "../functions";
import { useTranslation } from "react-i18next";
export default function SignIn() {
  const logic = useSignInLogic();
  const { i18n, t } = useTranslation();
  // Destructure for clarity
  const {
    email,
    setEmail,
    password,
    setPassword,
    inputType,
    showPass,
    togglePass,
    handleFocus,
    handleBlur,
    handleLogin,
    loading,
    googleLoginOrSignUp,
    navigate,
  } = logic;

  // Memoize inputs to avoid recreating on every render
  const inputs = useMemo(
    () => [
      {
        label: "Email",
        value: email,
        onChange: setEmail,
        type: "email",
        Icon: MdEmail,
        className: "w-100",
      },
      {
        label: "Password",
        value: password,
        onChange: setPassword,
        type: inputType,
        Icon: showPass ? FaEye : FaEyeLowVision,
        onIconClick: togglePass,
        className: "w-100",
      },
    ],
    [email, setEmail, password, setPassword, inputType, showPass, togglePass]
  );

  // Centralized submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <div className="background" />
      <Header />
      <main>
        <section className="section-main">
          <div className="container">
            <div className="left section-layout">
              <div className="form-wrapper">
                <div className="section-main-heading">
                  <h2>
                    {t("Welcome Back")}<span>{t(",")}</span>
                  </h2>
                  <p className="text">
                    {t("Access your account and explore new opportunities.")}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="section-main-form">
                  {inputs.map((input, idx) => (
                    <AuthInput
                      key={idx}
                      label={t(input.label)}
                      value={input.value}
                      onChange={input.onChange}
                      type={input.type}
                      Icon={input.Icon}
                      onIconClick={input.onIconClick}
                      handleFocus={handleFocus}
                      handleBlur={handleBlur}
                      className={input.className}
                    />
                  ))}

                  <div className="forget-password">
                    <span
                      onClick={() => navigate("/resetpassword")}
                      className="pointer"
                    >
                      {t("Forget Password?")}
                    </span>
                  </div>

                  <AuthButton type="submit" loading={loading} disabled={loading}>
                    {t("Sign In")}
                  </AuthButton>
                </form>

                <AuthDivider text={t("Or continue with")} />
                <AuthGoogleButton
                  onClick={() => googleLoginOrSignUp("googlelogin")} disabled={loading}
                >
                  {t("Sign In With Google")}
                </AuthGoogleButton>

                <div className="other-auth">
                  <p>{t("Don't have an account?")}</p>
                  <button type="button" onClick={() => navigate("/signUp")}>
                    {t("Sign Up")}
                  </button>
                </div>
              </div>
            </div>

            <SideImg src={bg} />
          </div>
        </section>
      </main>
    </>
  );
}
