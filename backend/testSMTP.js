import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("EMAIL:", process.env.USER_EMAIL);
console.log("PASS:", process.env.USER_PASSWORD);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

await transporter.verify();
console.log("SMTP WORKING ✅");