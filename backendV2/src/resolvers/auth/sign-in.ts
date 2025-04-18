import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const prisma = new PrismaClient();

interface SignInRequestBody {
  username: string;
  password: string;
}

interface StatusCodeError extends Error {
  statusCode: number;
}

export const signIn = async (
  req: Request<{}, {}, SignInRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      const error = new Error("User not found") as StatusCodeError;
      error.statusCode = 404;
      res.status(404).json({
        success: false,
        message: error.message,
        statusCode: error.statusCode,
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password") as StatusCodeError;
      error.statusCode = 401;
      res.status(401).json({
        success: false,
        message: error.message,
        statusCode: error.statusCode,
      });
      return;
    }

    // Generate access token
    const accessToken = jwt.sign(
      { userId: user.id, profileId: user.profileId },  // Include profileId here
      process.env.TOKEN_SECRET || "",
      { expiresIn: "15m" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign({ userId: user.id }, TOKEN_SECRET, {
      expiresIn: "7d", // 7 days for refresh token expiry
    });

    // Store the refresh token securely (You can store it in the database or cookies)
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days for refresh token
    });

    // Remove password from user data before sending it to the client
    const { password: userPassword,verificationCode: userVerificationCode, ...userInfo } = user;

    // Send response with both access token and user data
    res.status(200).json({
      success: true,
      message: "Successfully signed in",
      data: {
        accessToken,
        refreshToken,
        user: userInfo,
        profileId: user.profileId,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
