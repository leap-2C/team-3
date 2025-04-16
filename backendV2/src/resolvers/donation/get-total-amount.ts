import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getTotalAmount = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params; 
  
  if (!userId) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }

  try {
    const totalAmount = await prisma.donation.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        recipientId: parseInt(userId), 
      },
    });

    res.status(200).json({
      totalAmount: totalAmount._sum.amount || 0, 
    });
  } catch (error) {
    console.error("Error calculating total donation amount:", error);
    res.status(500).json({ error: "Error calculating total donation amount" });
  }
};

export default getTotalAmount;
