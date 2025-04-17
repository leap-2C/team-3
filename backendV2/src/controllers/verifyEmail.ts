import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, code } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    if (user.isVerified) {
      res
        .status(400)
        .json({ success: false, message: "User already verified" });
      return;
    }

    if (user.verificationCode !== code) {
      res
        .status(400)
        .json({ success: false, message: "Invalid verification code" });
      return;
    }

    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        verificationCode: "",
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Email successfully verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
