import { Request, Response } from "express";
import { PrismaClient, Profile } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH /profile/:profileId (Route to update a profile)
export const putUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the profileId from the URL parameter and the updated data from the request body
    const { profileId } = req.params;
    const updatedData = req.body;

    // Find the profile by its ID
    const profile = await prisma.profile.findUnique({
      where: { id: Number(profileId) },
    });

    // If no profile is found, return a 404 error
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
    }

    // Update the profile with the new data
    const updatedProfile = await prisma.profile.update({
      where: { id: Number(profileId) },
      data: {
        ...updatedData,
        updatedAt: new Date(), // Update the timestamp
      },
    });

    // Send the updated profile as a response
    res.json(updatedProfile);
  } catch (error) {
    // Handle errors and send a 500 response with the error message
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
