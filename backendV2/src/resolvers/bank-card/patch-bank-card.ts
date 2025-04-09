import { PrismaClient } from "@prisma/client";
import { Response, Request, NextFunction } from "express";

const prisma = new PrismaClient();
interface PatchBankCardRequest extends Request {
  params: {
    bankCardId: string;
  };
  body: {
    [key: string]: any; // Adjust this to match the structure of the bank card update payload
  };
}

interface PatchBankCardResponse extends Response {
  json: (body: { message: string; data?: any }) => this;
}

export async function patchBankCard(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { bankCardId } = req.params;
  try {
    const updatedBankCard = await prisma.bankCard.update({
      where: { id: Number(bankCardId) },
      data: req.body,
    });
    if (!updatedBankCard) {
      res.status(404).json({ message: "Bank card not found" });
      return;
    }
    res.status(200).json({
      message: "Bank card updated successfully",
      data: updatedBankCard,
    });
  } catch (err) {
    console.log("Error on PATCH bankcard:", err);
  }
}
