"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Function to send verification code via email
const sendEmail = (to, verificationCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
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
        yield transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
});
exports.sendEmail = sendEmail;
