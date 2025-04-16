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
exports.signIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const prisma = new client_1.PrismaClient();
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Find user by username
        const user = yield prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            res.status(404).json({
                success: false,
                message: error.message,
                statusCode: error.statusCode,
            });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid password");
            error.statusCode = 401;
            res.status(401).json({
                success: false,
                message: error.message,
                statusCode: error.statusCode,
            });
            return;
        }
        // Generate access token
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, TOKEN_SECRET, {
            expiresIn: "15m", // 15 minutes for access token expiry
        });
        // Generate refresh token
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, TOKEN_SECRET, {
            expiresIn: "7d", // 7 days for refresh token expiry
        });
        // Store the refresh token securely (You can store it in the database or cookies)
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days for refresh token
        });
        // Remove password from user data before sending it to the client
        const { password: userPassword } = user, userInfo = __rest(user, ["password"]);
        // Send response with both access token and user data
        res.status(200).json({
            success: true,
            message: "Successfully signed in",
            data: {
                accessToken,
                refreshToken,
                user: userInfo,
            },
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.signIn = signIn;
