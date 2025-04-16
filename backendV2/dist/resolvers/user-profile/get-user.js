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
exports.getUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// GET /profile/current-user (Route to get the user and their profile)
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Access the user ID from the authenticated request
        // Find the user by their ID, including their related profile
        const user = yield prisma.user.findUnique({
            where: { id: Number(id) },
            include: { profile: true }, // Include the related Profile
        });
        if (!user || !user.profile) {
            res.status(404).json({ message: "Profile not found" });
        }
        else {
            // Return the user's profile data
            res.json(user.profile);
        }
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getUser = getUser;
