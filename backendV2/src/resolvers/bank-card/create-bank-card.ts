import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

// Cardnii type
interface CreateBankCardRequestBody {
  cardNumber: string;
  country: string;
  firstName: string;
  lastName: string;
  expiryDate: string;
}
// Eniig INT bolgoh heregtei !!!!
interface CreateBankCardRequestParams {
  [key: string]: string;
  id: string;
}

interface CreateBankCardRequest extends Request {
  body: CreateBankCardRequestBody;
  params: CreateBankCardRequestParams;
}

export const createBankCard = async (
  req: CreateBankCardRequest,
  res: Response
) => {
  const { id } = req.params;
  const { cardNumber, country, firstName, lastName, expiryDate } = req.body;
  try {
    console.log("data", req.body);

    const savedBankCard = await prisma.bankCard.create({
      data: {
        cardNumber,
        country,
        firstName,
        lastName,
        expiryDate,
        userId: parseInt(id),
      },
    });

    res
      .status(201)
      .json({ message: "Bank card saved successfully", data: savedBankCard });
  } catch (err) {
    console.log("Error on POST bankcard:", err);
    res.status(505).json({ error: err });
  }
};
