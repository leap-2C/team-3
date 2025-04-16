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
exports.createBankCard = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBankCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { cardNumber, country, firstName, lastName, expiryDate } = req.body;
    try {
        console.log("data", req.body);
        const savedBankCard = yield prisma.bankCard.create({
            data: {
                cardNumber,
                country,
                firstName,
                lastName,
                expiryDate,
                userId: parseInt(id),
            },
        });
        res
            .status(201)
            .json({ message: "Bank card saved successfully", data: savedBankCard });
    }
    catch (err) {
        console.log("Error on POST bankcard:", err);
        res.status(505).json({ error: err });
    }
});
exports.createBankCard = createBankCard;
