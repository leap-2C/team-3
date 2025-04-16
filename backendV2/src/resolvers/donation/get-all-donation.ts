import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllDonation = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params; //route deer bga :userId g avna

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),//avsan userId gaaraa id hesgees haij bga ym shig bgan
      },
    });

    if (!userExists) {
      res.status(404).json({ error: "User not found" }); //user oldohgu uyed
      return;
    } 

    const sentDonations = await prisma.donation.findMany({//donation model
      where: {
        recipientId: parseInt(userId), //donorId (don hiisen hun) hesgees userId gaar haigaad bga ym shig l bnleshd
      },
    });

    if (sentDonations.length === 0 ) { //don hiigegu bvl msg yvuulna
      res.json("no donations sent")
        return;
    }
    res.status(200).json({
      sentDonations,
    });
  } catch (error) {
    console.error("Error fetching sent donations:", error);
    res.status(500).json({ error: "Error fetching sent donations" });
  }
};

export default getAllDonation;
