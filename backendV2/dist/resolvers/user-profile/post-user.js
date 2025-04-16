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
exports.postUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// POST /profile/:userId (Route to create a new profile for the user)
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, about, avatarImage, socialMediaURL, backgroundImage, successMessage, } = req.body;
        // Create a new Profile
        const profile = yield prisma.profile.create({
            data: {
                name,
                about,
                avatarImage,
                socialMediaURL,
                backgroundImage,
                successMessage,
            },
        });
        // Find the user by userId
        const user = yield prisma.user.findUnique({
            where: { id: Number(req.params.userId) },
        });
        // If the user is not found, return a 404 error
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        else {
            // Update the user to associate the profile with the user
            yield prisma.user.update({
                where: { id: user.id },
                data: {
                    profileId: profile.id, // Set the profileId of the user
                },
            });
        }
        // Return the newly created profile as a response
        res.status(201).json(profile);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.postUser = postUser;
