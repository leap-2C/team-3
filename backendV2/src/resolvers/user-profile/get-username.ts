import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /profile/view/:username (Route to get the user and their profile by username)
export const getUsername = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Find the user by their username, including the related profile
    const user = await prisma.user.findUnique({
      where: { username: req.params.username },
      include: { profile: true }, // Include the Profile relation
    });

    // If the user or their profile doesn't exist, return a 404 error
    if (!user || !user.profile) {
      res.status(404).json({ message: "Profile not found" });
    }

    // Return the profile data as a response
    else {
      res.json(user.profile);
    }
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
