import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createDonation = async (req: Request, res: Response): Promise<void> => {
<<<<<<< HEAD
  const { specialMessage, donorId, recipientId, amount, socialURLOrBuyMeACoffee } = req.body;

  if (!specialMessage || !donorId || !recipientId || !amount || !socialURLOrBuyMeACoffee) {
    res.status(400).json({ error: "Missing field" });
    return;
  }

=======
  const { specialMessage, donorId, recipientId, amount, socialURLOrBuyMeACoffee } = req.body; 
if ( !specialMessage|| !donorId || !recipientId || !amount || !socialURLOrBuyMeACoffee) { 
   res.json('missing field')
    return;
}
>>>>>>> main
  try {
    const newDonation = await prisma.donation.create({
      data: {
        specialMessage,
<<<<<<< HEAD
        donorId,
        recipientId,
        amount,
        socialURLOrBuyMeACoffee,
      },
      include: {
        donor: {
          select: {
             username: true, 
          },
        },
      },
    });

    res.json(newDonation);
=======
        donorId,  
        recipientId,
        amount,  
        socialURLOrBuyMeACoffee,  
      },
    });


    res.json(newDonation);

    
>>>>>>> main
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ error: "Error creating donation" });
  }
};

export default createDonation;
