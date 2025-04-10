import nodemailer from "nodemailer";

// Function to send verification code via email
export const sendEmail = async (
  to: string,
  verificationCode: string
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or other email services (e.g., Yahoo, Outlook)
      auth: {
        user: process.env.EMAIL_USER, // Your email (from .env)
        pass: process.env.EMAIL_PASS, // Your email password (app-specific password for Gmail)
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Email Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
