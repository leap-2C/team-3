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
exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// GET /profile/explore (Route to get all users' profiles)
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all users and include their related profiles
        const users = yield prisma.user.findMany({
            include: { profile: true }, // Include the related profile
        });
        // Extract profiles, ensuring that we only return valid profiles
        const profiles = users
            .map((user) => user.profile) // Get the profile for each user
            .filter((profile) => Boolean(profile)); // Filter out null profiles
        // Send the profiles as the response
        res.json(profiles);
    }
    catch (error) {
        // Handle any errors and send a 500 status with the error message
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getUsers = getUsers;
