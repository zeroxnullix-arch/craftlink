// export default sendMail;
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, otp) => {
  if (!to) throw new Error("Email required");

  try {
    const result = await resend.emails.send({
      from: "CraftLink <onboarding@resend.dev>",
      to,
      subject: "Your OTP Code",
      html: `
        <div style="font-family:Arial">
          <h2>Your OTP Code</h2>
          <h1 style="color:#4f46e5">${otp}</h1>
          <p>Valid for 5 minutes</p>
        </div>
      `,
    });

    console.log("OTP sent:", result.data.id);
    return result;
  } catch (err) {
    console.error("OTP ERROR:", err);
    throw err;
  }
};

export default sendMail;