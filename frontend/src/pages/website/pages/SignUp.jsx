// ===================== React Imports ===================== //
import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ===================== Icons Imports ===================== //
import {
  FaEye,
  MdEmail,
  FaEyeLowVision,
  BsPersonBoundingBox,
  BsFillShieldLockFill,
  BiMessageSquareError,
} from "@icons";

// ===================== Components Imports ===================== //
import {
  Header,
  SideImg,
  PopUpTerms,
  AuthInput,
  AuthButton,
  AuthDivider,
  AuthGoogleButton,
} from "@components";
import { useTranslation } from "react-i18next";
// ===================== Functions Imports ===================== //
import { useSignUpLogic } from "../functions";

// ===================== Images Imports ===================== //
import bg from "../../../assets/img/BgSignUp.jpg";

export default function SignUp() {
  const { i18n, t } = useTranslation();
  const logic = useSignUpLogic();

  // Destructure for clarity
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPass,
    togglePass,
    inputType,
    handleFocus,
    handleBlur,
    role,
    setRole,
    agreedTerms,
    setAgreedTerms,
    errorMsg,
    setErrorMsg,
    showTerms,
    setShowTerms,
    handleSignup,
    handleGoogleSignup,
    loading,
    navigate,
  } = logic;

  // Memoize inputs to avoid recreating on every render
  const inputs = useMemo(
    () => [
      {
        label: "First Name",
        value: firstName,
        onChange: setFirstName,
        Icon: BsPersonBoundingBox,
        type: "text",
      },
      {
        label: "Last Name",
        value: lastName,
        onChange: setLastName,
        Icon: BsPersonBoundingBox,
        type: "text",
      },
      {
        label: "Email",
        value: email,
        onChange: setEmail,
        Icon: MdEmail,
        type: "email",
        className: "w-100",
      },
      {
        label: "Create Password",
        value: password,
        onChange: setPassword,
        Icon: BsFillShieldLockFill,
        type: inputType,
        className: "w-100",
      },
      {
        label: "Re-Password",
        value: confirmPassword,
        onChange: setConfirmPassword,
        Icon: showPass ? FaEye : FaEyeLowVision,
        onIconClick: togglePass,
        type: inputType,
        className: "w-100",
      },
    ],
    [
      firstName,
      setFirstName,
      lastName,
      setLastName,
      email,
      setEmail,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      showPass,
      togglePass,
      inputType,
    ]
  );
  // Centralized submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };
  return (
    <>
      <div className="background"></div>
      {showTerms && (
        <PopUpTerms
          onClose={() => {
            setShowTerms(false);
            setAgreedTerms(false);
          }}
          onAccept={() => {
            setAgreedTerms(true);
            setErrorMsg((prev) => ({ ...prev, terms: "" }));
            setShowTerms(false);
          }}
        />
      )}
      <Header />
      <main>
        <section className="section-main">
          <div className="container">
            <div className="left section-layout">
              <div className="form-wrapper">
                <div className="section-main-heading">
                  <h2>
                    {t("Create new account")}<span>.</span>
                  </h2>
                  <p className="text">
                    {t("One account to learn, teach, or hire skilled professionals.")}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="section-main-form">
                  {inputs.map((input, index) => (
                    <AuthInput
                      key={index}
                      label={t(input.label)}
                      value={input.value}
                      onChange={input.onChange}
                      Icon={input.Icon}
                      onIconClick={input.onIconClick}
                      handleFocus={handleFocus}
                      handleBlur={handleBlur}
                      type={input.type}
                      className={input.className}
                    />
                  ))}

                  {/* Roles */}
                  <div className="radio-buttons-container">
                    {[
                      { label: t("craftsman"), value: "craftsman" },
                      { label: t("instructor"), value: "instructor" },
                      { label: t("client"), value: "client" },
                    ].map((r) => (
                      <div className="radio-button" key={r.value}>
                        <input
                          type="radio"
                          id={r.value}
                          name="role"
                          value={r.value}
                          checked={role === r.value}
                          onChange={() => {
                            setRole(r.value);
                            setErrorMsg((prev) => ({
                              ...prev,
                              role: "",
                            }));
                          }}
                          className="radio-button__input"
                        />

                        <label
                          htmlFor={r.value}
                          className="radio-button__label"
                        >
                          <span className="radio-button__custom"></span>

                          {r.label}
                        </label>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence>
                    {errorMsg?.role && (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scaleY: 0, transformOrigin: "top" }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="error-text"
                      >
                        <BiMessageSquareError className="icon" />
                        <p className="error-inner">{errorMsg.role}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Terms */}
                  <div className="auth-check">
                    <div className="content">
                      <label className="checkBox">
                        <input
                          type="checkbox"
                          checked={agreedTerms}
                          onChange={(e) => {
                            setAgreedTerms(e.target.checked);
                            if (e.target.checked) {
                              setErrorMsg((prev) => ({ ...prev, terms: "" }));
                            }
                          }}
                        />
                        <div className="transition"></div>
                      </label>
                    </div>

                    <p className="text">
                      {t("I agree to the")}{" "}
                      <span onClick={() => setShowTerms(true)}>
                        {t("Terms of Use")}
                      </span>.
                    </p>
                  </div>

                  <AnimatePresence>
                    {errorMsg?.terms && (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scaleY: 0, transformOrigin: "top" }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="error-text"
                      >
                        <BiMessageSquareError className="icon" />
                        <p className="error-inner">{errorMsg.terms}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AuthButton type="submit" disabled={loading} loading={loading}>
                    {t("Sign Up")}
                  </AuthButton>
                  <AuthDivider text={t("Or continue with")} />
                </form>
                <AuthGoogleButton onClick={handleGoogleSignup}>
                  {t("Sign Up With Google")}
                </AuthGoogleButton>
                <div className="other-auth">
                  <p>{t("Already have an account?")}</p>
                  <button type="button" onClick={() => navigate("/signin")}>
                    {t("Sign In")}
                  </button>
                </div>
              </div>
            </div>
            {/* Right Image */}
            <SideImg src={bg} />
          </div>
        </section>
      </main>
    </>
  );
}
