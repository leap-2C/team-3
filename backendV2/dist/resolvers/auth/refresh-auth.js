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
exports.refreshAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
// Refresh Token endpoint
const refreshAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the refresh token from the cookie
        const refreshToken = req.cookies.refresh_token;
        // If no refresh token, respond with an error
        if (!refreshToken) {
            res.status(401).json({
                success: false,
                message: "Refresh token not found, please log in again.",
            });
        }
        // Verify the refresh token
        jsonwebtoken_1.default.verify(refreshToken, TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid refresh token.",
                });
            }
            // Extract userId from the decoded token
            const userId = decoded.userId;
            // Optional: Validate user existence in the database
            const user = yield prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found.",
                });
            }
            // Create a new access token
            const newAccessToken = jsonwebtoken_1.default.sign({ userId }, TOKEN_SECRET, {
                expiresIn: "15m", // New access token will be valid for 15 minutes
            });
            res.status(200).json({
                success: true,
                message: "New access token generated.",
                data: {
                    accessToken: newAccessToken,
                },
            });
        }));
    }
    catch (err) {
        // Catch any other errors and respond with a generic error message
        res.status(500).json({
            success: false,
            message: "Server error.",
        });
    }
});
exports.refreshAuth = refreshAuth;
