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
const createDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { specialMessage, donorId, recipientId, amount, socialURLOrBuyMeACoffee } = req.body;
    if (!specialMessage || !donorId || !recipientId || !amount || !socialURLOrBuyMeACoffee) {
        res.json('missing field');
        return;
    }
    try {
        const newDonation = yield prisma.donation.create({
            data: {
                specialMessage,
                donorId,
                recipientId,
                amount,
                socialURLOrBuyMeACoffee,
            },
        });
        res.json(newDonation);
    }
    catch (error) {
        console.error("Error creating donation:", error);
        res.status(500).json({ error: "Error creating donation" });
    }
});
exports.default = createDonation;
