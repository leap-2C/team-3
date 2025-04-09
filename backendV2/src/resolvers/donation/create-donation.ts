import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createDonation = async (req: Request, res: Response): Promise<void> => {
  const { specialMessage, donorId, recipientId, amount, socialURLOrBuyMeACoffee } = req.body; 
if ( !specialMessage|| !donorId || !recipientId || !amount || !socialURLOrBuyMeACoffee) { 
   res.json('missing field')
    return;
}
  try {
    const newDonation = await prisma.donation.create({
      data: {
        specialMessage,
        donorId,  
        recipientId,
        amount,  
        socialURLOrBuyMeACoffee,  
      },
    });


    res.json(newDonation);

    
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ error: "Error creating donation" });
  }
};

export default createDonation;
