import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
//const CheckCustomURL: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>
export const CheckCustomURL = async (req: Request, res: Response) => {
  const { socialMediaURL } = req.body;

  if (!socialMediaURL || typeof socialMediaURL !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const existing = await prisma.profile.findUnique({
      where: { socialMediaURL },
    });

    if (existing) {
      return res
        .status(400)
        .json({ available: false, message: "URL is already taken" });
    }

    return res
      .status(200)
      .json({ available: true, message: "URL is available" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
