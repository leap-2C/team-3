"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN awch baina
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Access token missing. Please log in.",
        });
        return;
    }
    jsonwebtoken_1.default.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({
                success: false,
                message: "Invalid or expired access token.",
            });
            return;
        }
        //Id-g tokenoos awch user deer nemj baina.
        req.user = { userId: decoded.userId };
        next();
    });
};
exports.authenticateToken = authenticateToken;
