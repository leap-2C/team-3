import { Request, Response } from "express";
import { PrismaClient, User, Profile } from "@prisma/client";

const prisma = new PrismaClient();

// POST /profile/:userId (Route to create a new profile for the user)
export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      about,
      avatarImage,
      socialMediaURL,
      backgroundImage,
      successMessage,
    } = req.body;

    // Create a new Profile
    const profile = await prisma.profile.create({
      data: {
        name,
        about,
        avatarImage,
        socialMediaURL,
        backgroundImage,
        successMessage,
      },
    });

    // Find the user by userId
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.userId) },
    });

    // If the user is not found, return a 404 error
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      // Update the user to associate the profile with the user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          profileId: profile.id, // Set the profileId of the user
        },
      });
    }

    // Return the newly created profile as a response
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};