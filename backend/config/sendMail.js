import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;

if (!USER_EMAIL || !USER_PASSWORD) {
  console.warn("❌ Missing EMAIL or PASSWORD in environment variables");
}

// 🔥 IMPORTANT: use SMTP manual config (NOT service: Gmail)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // الأفضل على Railway
  secure: false, // مهم جدًا
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD, // must be App Password (no spaces)
  },
  tls: {
    rejectUnauthorized: false,
  },
  pool: true,
  maxConnections: 1,
  connectionTimeout: 20000,
  socketTimeout: 20000,
});

/**
 * Send Email (OTP)
 */
const sendMail = async (to, otp, opts = {}) => {
  if (!to) throw new Error("Recipient email is required");

  const from = opts.from || `CraftLink Support <${USER_EMAIL}>`;
  const subject = opts.subject || "Reset Your Password";

  const html =
    opts.html ||
    `
    <div style="font-family: Arial;">
      <h2>CraftLink OTP Verification</h2>
      <p>Your OTP code is:</p>
      <h1 style="color:#4f46e5">${otp}</h1>
      <p>This code expires in 5 minutes.</p>
    </div>
  `;

  const text =
    opts.text ||
    `Your OTP is ${otp}. It expires in 5 minutes.`;

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ sendMail ERROR:", error.message || error);
    throw new Error("Failed to send email");
  }
};

export default sendMail;