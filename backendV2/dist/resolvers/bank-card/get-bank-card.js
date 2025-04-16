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
exports.getBankCard = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getBankCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userIdNumber = Number(id); // userId aa string ees number bolgoj bgaa
    if (isNaN(userIdNumber)) {
        res.status(400).json({ data: "Invalid user ID" });
        return;
    }
    try {
        const bankCards = yield prisma.bankCard.findMany({
            where: { userId: userIdNumber },
        });
        if (bankCards.length === 0) {
            res.status(404).json({ data: "No bank cards found for this user" });
            return;
        }
        res.status(200).json({ data: bankCards });
    }
    catch (error) {
        console.log("Error on GET bankcard:", error);
        res.status(505).json({ data: error });
    }
});
exports.getBankCard = getBankCard;
