import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

// Refresh Token endpoint
export const refreshAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get the refresh token from the cookie
    const refreshToken = req.cookies.refresh_token;

    // If no refresh token, respond with an error
    if (!refreshToken) {
      res.status(401).json({
        success: false,
        message: "Refresh token not found, please log in again.",
      });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, TOKEN_SECRET, async (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid refresh token.",
        });
      }

      // Extract userId from the decoded token
      const userId = (decoded as any).userId;

      // Optional: Validate user existence in the database
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      // Create a new access token
      const newAccessToken = jwt.sign({ userId }, TOKEN_SECRET, {
        expiresIn: "15m", // New access token will be valid for 15 minutes
      });

      res.status(200).json({
        success: true,
        message: "New access token generated.",
        data: {
          accessToken: newAccessToken,
        },
      });
    });
  } catch (err) {
    // Catch any other errors and respond with a generic error message
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
