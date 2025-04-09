import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
interface GetBankCardRequest extends Request {
    params: {
        userId: string;
    };
}

interface GetBankCardResponse extends Response {
    status: (code: number) => this;
    json: (body: { data: unknown }) => this;
}

const prisma = new PrismaClient();

export const getBankCard = async (req: GetBankCardRequest, res: GetBankCardResponse) => {
    const { userId } = req.params;
    try {
        const bankCards = await prisma.bankCard.findMany({ where: { userId: Number(userId) } }); // userId aa string ees number bolgoj bgaa
        res.status(200).json({ data: bankCards });
    } catch (err) {
        console.log("Error on GET bankcard:", err);
    } finally {
        await prisma.$disconnect();
    }
};


