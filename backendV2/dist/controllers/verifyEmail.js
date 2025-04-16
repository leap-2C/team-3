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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code } = req.body;
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        if (user.isVerified) {
            res
                .status(400)
                .json({ success: false, message: "User already verified" });
            return;
        }
        if (user.verificationCode !== code) {
            res
                .status(400)
                .json({ success: false, message: "Invalid verification code" });
            return;
        }
        yield prisma.user.update({
            where: { email },
            data: {
                isVerified: true,
                verificationCode: "",
            },
        });
        res
            .status(200)
            .json({ success: true, message: "Email successfully verified" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.verifyEmail = verifyEmail;
