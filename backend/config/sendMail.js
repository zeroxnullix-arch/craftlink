import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // 🔥 استخدم 465 مع secure
  secure: true, // 🔥 true مع 465
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_APP_PASSWORD,
  },
  connectionTimeout: 30000, // 🔥 30 ثانية
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

// 🔥 اختبار الاتصال
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP FAILED:', error);
  } else {
    console.log('✅ SMTP READY');
  }
});

const sendMail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `CraftLink <${process.env.USER_EMAIL}>`,
      to,
      subject: "CraftLink OTP Verification",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>CraftLink OTP Verification</h2>
          <p>Your OTP code is:</p>
          <h1 style="letter-spacing:4px">${otp}</h1>
          <p>This code expires in 5 minutes.</p>
        </div>
      `,
    });

    console.log("✅ EMAIL SENT:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error.message);
    console.error("❌ FULL ERROR:", JSON.stringify(error, null, 2));
    throw error;
  }
};

export default sendMail;