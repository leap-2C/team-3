import express from "express";
import { PrismaClient } from "@prisma/client";
import { CheckCustomURL } from "../resolvers/url/checkCustomUrl";

const prisma = new PrismaClient();
export const URLrouter = express.Router();
URLrouter.post("/custom-url", async (req, res) => {
  await CheckCustomURL(req, res);
});
