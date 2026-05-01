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
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

/**
 * sendMail - send an email (default: OTP)
 * @param {string} to - recipient email address
 * @param {string} otp - one-time password (optional if html/text provided)
 * @param {object} [opts] - optional overrides: { subject, html, text, from }
 */
const sendMail = async (to, otp, opts = {}) => {
  if (!to) throw new Error("Recipient email is required");

  const mailOptions = {
    from: `CraftLink <${process.env.USER_EMAIL}>`,
    to,
    subject: "Your OTP Code",
    html: `
      <div>
        <h2>CraftLink OTP Verification</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing:3px">${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("EMAIL SENT:", info.messageId);
    return info;
  } catch (error) {
    console.error("EMAIL FAILED:", error);
    throw new Error("Email sending failed");
  }
};

export default sendMail;
