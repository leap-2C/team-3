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
exports.patchBankCard = patchBankCard;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function patchBankCard(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bankCardId } = req.params;
        // String ee number bolgono
        const id = Number(bankCardId);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid bank card ID" });
            return;
        }
        try {
            const updatedBankCard = yield prisma.bankCard.update({
                where: { id: Number(bankCardId) },
                data: req.body,
            });
            if (!updatedBankCard) {
                res.status(404).json({ message: "Bank card not foundd" });
                return;
            }
            res.status(200).json({
                message: "Bank card updated successfully",
                data: updatedBankCard,
            });
        }
        catch (err) {
            console.log("Error on PATCH bankcard:", err);
            // Handle specific errors (e.g., record not found)
            if (err.code === "P2025") {
                res.status(404).json({ message: "Bank card not found" });
            }
            else {
                res.status(500).json({ message: "Error updating bank card" });
            }
        }
    });
}
