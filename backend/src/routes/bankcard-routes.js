import express from "express";
import BankCard from "../schema/bankcard-schema.js";
import { createBankCard } from "../resolvers/createBankCard.js";
import { getBankCard } from "../resolvers/getBankCard.js";
import { patchBankCard } from "../resolvers/patchBankCard.js";

const router = express.Router();

router.post("/:id", createBankCard);
router.get("/:userID", getBankCard);
router.patch("/:bankCardId", patchBankCard);

export default router;
