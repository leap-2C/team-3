import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getSentDonation = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params; 
  


  try {
    const sentDonations = await prisma.donation.findMany({
    
      where: {
        donorId: parseInt(userId), 
      },
    });

    res.status(200).json({
     sentDonations
      
    });
  } catch (error) {
    console.error("Error calculating total donation amount:", error);
    res.status(500).json({ error: "Error calculating total donation amount" });
  }
};

export default getSentDonation;
