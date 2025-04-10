import express from "express";
import { PrismaClient } from "@prisma/client";
import { createBankCard } from "../resolvers/bank-card/create-bank-card";
import { getBankCard } from "../resolvers/bank-card/get-bank-card";
import { patchBankCard } from "../resolvers/bank-card/patch-bank-card";

const prisma = new PrismaClient();
export const bankCardRoute = express.Router();

bankCardRoute.post("/:id", createBankCard);
bankCardRoute.get("/:id", getBankCard);
bankCardRoute.patch("/:bankCardId", patchBankCard);
