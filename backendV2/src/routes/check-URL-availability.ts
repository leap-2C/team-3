import express from "express";
import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
export const checkAvailability = express.Router();
const prisma = new PrismaClient();

checkAvailability.post("/check-availability", async (req: Request, res: Response): Promise<void> => {
  const { value } = req.body;

  if (!value) {
    res.status(400).json({ error: "Value is required" });
  }

  try {
    const existingUser = await prisma.profile.findUnique({
      where: { socialMediaURL: value },
    });

    if (existingUser) {
       res.status(123).json({ available: false });
    } else {
      res.status(200).json({ available: true });
    }
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
