import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendEmail } from "../../services/email-verification";

dotenv.config();

const prisma = new PrismaClient();

interface SignUpRequestBody {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface StatusCodeError extends Error {
  statusCode: number;
}

export const signUp = async (
  req: Request<{}, {}, SignUpRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { username, password, email, firstName, lastName } = req.body;
  
    const lowerCaseUsername = username.toLowerCase();
    // username dawhtsaj baigaa uguig shalgana
    const existingUser = await prisma.user.findUnique({
      where: { username: lowerCaseUsername },
    });

    if (existingUser) {
      const error = new Error("Username already exists") as StatusCodeError;
      error.statusCode = 400;
      res.status(400).json({
        success: false,
        message: error.message,
        statusCode: error.statusCode,
      });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create a new user with verification code
    const newUser = await prisma.user.create({
      data: {
        username: lowerCaseUsername,
        password: hashedPassword,
        email,
        firstName: firstName || "",
        lastName: lastName || "",
        verificationCode,
        isVerified: false,
      },
    });

    // Send the verification email
    await sendEmail(email, verificationCode);

    // Generate access token
    const accessToken = jwt.sign(
      { userId: newUser.id },
      process.env.TOKEN_SECRET || "",
      { expiresIn: "15m" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: newUser.id },
      process.env.TOKEN_SECRET || "",
      { expiresIn: "7d" }
    );

    // Store the refresh token securely
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // passiig hasaj baina
    const { password: _, verificationCode: __, ...safeUserData } = newUser;

    // Send response
    res.status(201).json({
      success: true,
      message:
        "User registered. Please check your email for the verification code.",
      data: {
        accessToken,
        refreshToken,
        user: safeUserData,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
