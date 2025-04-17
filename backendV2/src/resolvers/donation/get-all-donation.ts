import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllDonation = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!userExists) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const receivedDonations = await prisma.donation.findMany({
      where: {
        recipientId: parseInt(userId),
      },
      include: {
        donor: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (receivedDonations.length === 0) {
      res.json("no donations sent");
      return;
    }

    res.status(200).json({
      receivedDonations,
    });
  } catch (error) {
    console.error("Error fetching sent donations:", error);
    res.status(500).json({ error: "Error fetching sent donations" });
  }
};

export default getAllDonation;
