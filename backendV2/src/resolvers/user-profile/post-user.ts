import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /profile/:userId 
export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      about,
      avatarImage,
      backgroundImage,
      successMessage,
      socialMediaURL,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.userId) },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const fullName = `${firstName} ${lastName}`;

    const profile = await prisma.profile.create({
      data: {
        name: fullName,
        about,
        avatarImage,
        backgroundImage,
        successMessage: successMessage ?? "",
        socialMediaURL: socialMediaURL ?? `temp-${Date.now()}`,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        profileId: profile.id,
      },
    });

    res.status(201).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
