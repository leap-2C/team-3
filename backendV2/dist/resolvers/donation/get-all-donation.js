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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params; //route deer bga :userId g avna
    try {
        const userExists = yield prisma.user.findUnique({
            where: {
                id: parseInt(userId), //avsan userId gaaraa id hesgees haij bga ym shig bgan
            },
        });
        if (!userExists) {
            res.status(404).json({ error: "User not found" }); //user oldohgu uyed
            return;
        }
        const sentDonations = yield prisma.donation.findMany({
            where: {
                donorId: parseInt(userId), //donorId (don hiisen hun) hesgees userId gaar haigaad bga ym shig l bnleshd
            },
        });
        if (sentDonations.length === 0) { //don hiigegu bvl msg yvuulna
            res.json("no donations sent");
            return;
        }
        res.status(200).json({
            sentDonations,
        });
    }
    catch (error) {
        console.error("Error fetching sent donations:", error);
        res.status(500).json({ error: "Error fetching sent donations" });
    }
});
exports.default = getAllDonation;
