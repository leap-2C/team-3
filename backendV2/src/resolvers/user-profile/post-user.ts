import { Request, Response } from "express";
 import { PrismaClient, User, Profile } from "@prisma/client";
 
 const prisma = new PrismaClient();
 
 // POST /profile/:userId 
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
 
     const user = await prisma.user.findUnique({
       where: { id: Number(req.params.userId) },
     });
 
     if (!user) {
       res.status(404).json({ message: "User not found" });
     } else {
       await prisma.user.update({
         where: { id: user.id },
         data: {
           profileId: profile.id, 
         },
       });
     }
 
     res.status(201).json(profile);
   } catch (error) {
     res.status(500).json({
       message: error instanceof Error ? error.message : "Unknown error",
     });
   }
 };