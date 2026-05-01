import { Header, AuthInput, AuthButton } from "@components";
import {
  MdEmail,
  FaEye,
  FaEyeLowVision,
  BsFillSendCheckFill,
  BsFillShieldLockFill,
} from "@icons";
import { useResetPasswordLogic } from "../functions";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
export default function ResetPassword() {
  const logic = useResetPasswordLogic();

  // Destructure for clarity
  const {
    step,
    email,
    setEmail,
    otp,
    setOtp,
    newPass,
    setNewPass,
    confirmPass,
    setConfirmPass,
    inputType,
    showPass,
    togglePass,
    handleFocus,
    handleBlur,
    sendOtp,
    verifyOtp,
    resetPassword,
    loading,
    canResend,
    resetTimer,
    timer,
    maskEmail,
    navigate,
  } = logic;

  // Memoize inputs map to avoid recreating on every render
  const inputsMap = useMemo(
    () => ({
      1: [
        { label: "Email", value: email, onChange: setEmail, type: "email", Icon: MdEmail },
      ],
      2: [
        { label: "Enter OTP", value: otp, onChange: setOtp, type: "text", Icon: BsFillSendCheckFill },
      ],
      3: [
        { label: "New Password", value: newPass, onChange: setNewPass, type: inputType, Icon: BsFillShieldLockFill },
        {
          label: "Confirm Password",
          value: confirmPass,
          onChange: setConfirmPass,
          Icon: showPass ? FaEye : FaEyeLowVision,
          onIconClick: togglePass,
          type: inputType,
        },
      ],
    }),
    [email, setEmail, otp, setOtp, newPass, setNewPass, confirmPass, setConfirmPass, inputType, showPass, togglePass]
  );

  // Centralized submit handler (keeps behavior identical)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) return sendOtp();
    if (step === 2) return verifyOtp();
    if (step === 3) return resetPassword();
  };
const { i18n, t } = useTranslation();
  return (
    <>
      <div className="background" />
      <div className="full-width">
        <Header />
      </div>

      <main>
        <section className="section-main">
          <div className="container">
            <div className="reset-container">
              <div className="form-wrapper">
                {/* Heading */}
                <div className="section-main-heading">
                  {step === 1 && (
                    <>
                      <h2>
                        {t("Forget Password")}<span>{t("?")}</span>
                      </h2>
                      <p className="text">{t("We'll send you the updated instructions shortly.")}</p>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h2>
                        {t("OTP Verification")}<span>.</span>
                      </h2>
                      <p className="text">{t("A verification code has been sent to")} {maskEmail(email)}</p>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h2>
                        {t("Reset Password")}<span>.</span>
                      </h2>
                      <p className="text">{t("Enter new password below.")}</p>
                    </>
                  )}
                </div>

                {/* Step Forms */}
                <form className="section-main-form" onSubmit={handleSubmit}>
                  {inputsMap[step].map((input, idx) => (
                    <AuthInput
                      key={idx}
                      label={input.label}
                      value={input.value}
                      onChange={input.onChange}
                      type={input.type}
                      Icon={input.Icon}
                      onIconClick={input.onIconClick}
                      handleFocus={handleFocus}
                      handleBlur={handleBlur}
                      className="w-100"
                    />
                  ))}

                  {step === 1 && (
                    <AuthButton type="submit" loading={loading}>
                      {t("Send OTP")}
                    </AuthButton>
                  )}

                  {step === 2 && (
                    <>
                      <div className="otp-resend">
                        {canResend ? (
                          <div className="resend-btn">
                            <p className="text">{t("Didn't get a code?")}</p>
                            <button
                              type="button"
                              onClick={() => {
                                resetTimer();
                                sendOtp();
                              }}
                            >
                              <span>{t("Resend")}</span>
                              <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-icon">
                                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                </svg>
                              </span>
                            </button>
                          </div>
                        ) : (
                          <p className="text">
                            {t("Time Remaining")}: {Math.floor(timer / 60).toString().padStart(2, "0")}:
                            {(timer % 60).toString().padStart(2, "0")}
                          </p>
                        )}
                      </div>

                      <AuthButton  type="submit" loading={loading}>
                        {t("Verify OTP")}
                      </AuthButton>
                    </>
                  )}

                  {step === 3 && (
                    <AuthButton  type="submit" loading={loading}>
                      {t("Reset Password")}
                    </AuthButton>
                  )}
                </form>

                {step === 1 && (
                  <div className="other-auth">
                    <p>{t("Didn't have an account?")}</p>
                    <button type="button" onClick={() => navigate("/signup")}>
                      {t("Sign Up")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
