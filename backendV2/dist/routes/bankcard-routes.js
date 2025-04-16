"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankCardRoute = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const create_bank_card_1 = require("../resolvers/bank-card/create-bank-card");
const get_bank_card_1 = require("../resolvers/bank-card/get-bank-card");
const patch_bank_card_1 = require("../resolvers/bank-card/patch-bank-card");
const prisma = new client_1.PrismaClient();
exports.bankCardRoute = express_1.default.Router();
exports.bankCardRoute.post("/:id", create_bank_card_1.createBankCard);
exports.bankCardRoute.get("/:id", get_bank_card_1.getBankCard);
exports.bankCardRoute.patch("/:bankCardId", patch_bank_card_1.patchBankCard);
