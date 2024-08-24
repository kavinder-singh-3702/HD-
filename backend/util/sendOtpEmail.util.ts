import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default async function sendMail(
  email: string,
  subject: string,
  html: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  } finally {
    transporter.close();
  }
}
