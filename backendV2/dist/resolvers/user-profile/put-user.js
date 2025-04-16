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
exports.putUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// PATCH /profile/:profileId (Route to update a profile)
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract the profileId from the URL parameter and the updated data from the request body
        const { profileId } = req.params;
        const updatedData = req.body;
        // Find the profile by its ID
        const profile = yield prisma.profile.findUnique({
            where: { id: Number(profileId) },
        });
        // If no profile is found, return a 404 error
        if (!profile) {
            res.status(404).json({ message: "Profile not found" });
        }
        // Update the profile with the new data
        const updatedProfile = yield prisma.profile.update({
            where: { id: Number(profileId) },
            data: Object.assign(Object.assign({}, updatedData), { updatedAt: new Date() }),
        });
        // Send the updated profile as a response
        res.json(updatedProfile);
    }
    catch (error) {
        // Handle errors and send a 500 response with the error message
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.putUser = putUser;
