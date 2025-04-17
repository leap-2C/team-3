import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
interface GetBankCardRequest extends Request {
  params: {
    id: string;
  };
}

interface GetBankCardResponse extends Response {
  status: (code: number) => this;
  json: (body: { data: unknown }) => this;
}

const prisma = new PrismaClient();

export const getBankCard = async (
  req: GetBankCardRequest,
  res: GetBankCardResponse
) => {
    const { id } = req.params;
  const userIdNumber = Number(id);// userId aa string ees number bolgoj bgaa
  if (isNaN(userIdNumber)) {
    res.status(400).json({ data: "Invalid user ID" });
    return;
  }
  try {
    const bankCards = await prisma.bankCard.findMany({
      where: { userId: userIdNumber },
    }); 

    if (bankCards.length === 0) {
        res.status(404).json({ data: "No bank cards found for this user" });
        return;
      }
    res.status(200).json({ data: bankCards });
  } catch (error) {
    console.log("Error on GET bankcard:", error);
    res.status(505).json({ data: error });
  }
};
