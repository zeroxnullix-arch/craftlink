import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;

if (!USER_EMAIL || !USER_PASSWORD) {
  console.warn("sendMail: USER_EMAIL or USER_PASSWORD is missing!");
}

// 🔥 SMTP CONFIG (FIXED FOR RAILWAY)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // مهم جدًا (مش 465)
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  socketTimeout: 10000,
  pool: true,
  maxConnections: 1,
});

/**
 * sendMail - send OTP email
 */
const sendMail = async (to, otp, opts = {}) => {
  if (!to) throw new Error("Recipient email (to) is required");

  const from = opts.from || `CraftLink Support <${USER_EMAIL}>`;
  const subject = opts.subject || "Reset Your Password";

  const html =
    opts.html ||
    `<div>
      <h2>CraftLink OTP</h2>
      <p>Your OTP code is:</p>
      <h1>${otp}</h1>
      <p>It expires in 5 minutes.</p>
    </div>`;

  const text =
    opts.text ||
    `Your OTP for password reset is ${otp}. It expires in 5 minutes.`;

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
    });

    console.log(`Email sent successfully to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("sendMail ERROR:", error);
    throw new Error("Failed to send email");
  }
};

export default sendMail;