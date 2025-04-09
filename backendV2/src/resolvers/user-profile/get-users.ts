import { Request, Response } from "express";
import { PrismaClient, Profile } from "@prisma/client";

const prisma = new PrismaClient();

// GET /profile/explore (Route to get all users' profiles)
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all users and include their related profiles
    const users = await prisma.user.findMany({
      include: { profile: true }, // Include the related profile
    });

    // Extract profiles, ensuring that we only return valid profiles
    const profiles = users
      .map((user) => user.profile) // Get the profile for each user
      .filter((profile): profile is Profile => Boolean(profile)); // Filter out null profiles

    // Send the profiles as the response
    res.json(profiles);
  } catch (error) {
    // Handle any errors and send a 500 status with the error message
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
