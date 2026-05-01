import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const { USER_EMAIL, USER_PASSWORD } = process.env;
if (!USER_EMAIL || !USER_PASSWORD) {
  console.warn(
    "sendMail: USER_EMAIL or USER_PASSWORD is not set. Emails will fail.",
  );
}
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
});

/**
 * sendMail - send an email (default: OTP)
 * @param {string} to - recipient email address
 * @param {string} otp - one-time password (optional if html/text provided)
 * @param {object} [opts] - optional overrides: { subject, html, text, from }
 */
const sendMail = async (to, otp, opts = {}) => {
  if (!to) throw new Error("Recipient email (to) is required");
  const from = opts.from || `CraftLink Support <${USER_EMAIL}>`;
  const subject = opts.subject || "Reset Your Password";
  const html =
    opts.html ||
    `<p>Your OTP for password reset is <strong>${otp}</strong>. It expires in 5 minutes.</p>`;
  const text =
    opts.text ||
    `Your OTP for password reset is ${otp}. It expires in 5 minutes.`;
  try {
    const info = await transporter.sendMail({ from, to, subject, html, text });
    console.log(`Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(
      "sendMail error:",
      error && error.message ? error.message : error,
    );
    throw error;
  }
};

export default sendMail;
