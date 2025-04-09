import express from "express";
import { PrismaClient } from "@prisma/client";

import { BankCard } from "@prisma/client";
import { createBankCard } from "../resolvers/bank-card/create-bank-card";
import { getBankCard } from "../resolvers/bank-card/get-bank-card";
import { patchBankCard } from "../resolvers/bank-card/patch-bank-card";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/:id", createBankCard);
router.get("/:userID", getBankCard);
router.patch("/:bankCardId", patchBankCard);

export default router;
