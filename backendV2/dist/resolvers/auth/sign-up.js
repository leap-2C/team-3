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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const email_verification_1 = require("../../services/email-verification");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email, firstName, lastName } = req.body;
        // username dawhtsaj baigaa uguig shalgana
        const existingUser = yield prisma.user.findUnique({
            where: { username },
        });
        if (existingUser) {
            const error = new Error("Username already exists");
            error.statusCode = 400;
            res.status(400).json({
                success: false,
                message: error.message,
                statusCode: error.statusCode,
            });
            return;
        }
        // Hash the password
        const salt = yield bcryptjs_1.default.genSalt(12);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Generate a verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        // Create a new user with verification code
        const newUser = yield prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                email,
                firstName: firstName || "",
                lastName: lastName || "",
                verificationCode,
                isVerified: false,
            },
        });
        // Send the verification email
        yield (0, email_verification_1.sendEmail)(email, verificationCode);
        // Generate access token
        const accessToken = jsonwebtoken_1.default.sign({ userId: newUser.id }, process.env.TOKEN_SECRET || "", { expiresIn: "15m" });
        // Generate refresh token
        const refreshToken = jsonwebtoken_1.default.sign({ userId: newUser.id }, process.env.TOKEN_SECRET || "", { expiresIn: "7d" });
        // Store the refresh token securely
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        // passiig hasaj baina
        const { password: _, verificationCode: __ } = newUser, safeUserData = __rest(newUser, ["password", "verificationCode"]);
        // Send response
        res.status(201).json({
            success: true,
            message: "User registered. Please check your email for the verification code.",
            data: {
                accessToken,
                refreshToken,
                user: safeUserData,
            },
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.signUp = signUp;
