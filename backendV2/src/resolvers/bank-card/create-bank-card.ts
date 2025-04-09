import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

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
  try {
    const { id } = req.params;
    const { cardNumber, country, firstName, lastName, expiryDate } = req.body;
    const hashedCardNumber = await bcrypt.hash(cardNumber, SALT_ROUNDS);
    const hashedCountry = await bcrypt.hash(country, SALT_ROUNDS);
    const hashedFirstName = await bcrypt.hash(firstName, SALT_ROUNDS);
    const hashedLastName = await bcrypt.hash(lastName, SALT_ROUNDS);
    const hashedExpiryDate = await bcrypt.hash(expiryDate, SALT_ROUNDS);
    const savedBankCard = await prisma.bankCard.create({
      data: {
        cardNumber: hashedCardNumber,
        country: hashedCountry,
        firstName: hashedFirstName,
        lastName: hashedLastName,
        expiryDate: hashedExpiryDate,
        userId: parseInt(id, 10),
      },
    });

    res
      .status(201)
      .json({ message: "Bank card saved successfully", data: savedBankCard });
  } catch (err) {
    console.log("Error on POST bankcard:", err);
  }
};
