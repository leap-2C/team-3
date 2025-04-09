import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /profile/current-user (Route to get the user and their profile)
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Access the user ID from the authenticated request

    // Find the user by their ID, including their related profile
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { profile: true }, // Include the related Profile
    });

    if (!user || !user.profile) {
      res.status(404).json({ message: "Profile not found" });
    } else {
      // Return the user's profile data
      res.json(user.profile);
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};