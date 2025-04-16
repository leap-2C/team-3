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
exports.getUsername = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// GET /profile/view/:username (Route to get the user and their profile by username)
const getUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the user by their username, including the related profile
        const user = yield prisma.user.findUnique({
            where: { username: req.params.username },
            include: { profile: true }, // Include the Profile relation
        });
        // If the user or their profile doesn't exist, return a 404 error
        if (!user || !user.profile) {
            res.status(404).json({ message: "Profile not found" });
        }
        // Return the profile data as a response
        else {
            res.json(user.profile);
        }
    }
    catch (error) {
        // Handle any errors
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getUsername = getUsername;
