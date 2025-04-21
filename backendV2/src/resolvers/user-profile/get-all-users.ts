// const getAllUser = (req,res)=>{

// }
// export default\

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; //profile id

    const profile = await prisma.profile.findUnique({
      where: { id: Number(id) },
      include: { user: true }, // include related user
    });

    if (!profile || !profile.user) {
      res.status(404).json({ message: "User not found for this profile" });
    } else {
      res.json({ userId: profile.user.id });
      console.log(profile.user.id);
      
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
