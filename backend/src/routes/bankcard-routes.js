import express from "express";
import BankCard from "../schema/bankcard-schema.js";
import { createBankCard } from "../resolvers/bank-card/createBankCard.js";
import { getBankCard } from "../resolvers/bank-card/getBankCard.js";
import { patchBankCard } from "../resolvers/bank-card/patchBankCard.js";

const router = express.Router();

router.post("/:id", createBankCard);
router.get("/:userID", getBankCard);
router.patch("/:bankCardId", patchBankCard);

export default router;
