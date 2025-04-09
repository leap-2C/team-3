import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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

    const existingUser = await prisma.user.findUnique({
      where: { username },
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

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
        firstName: firstName || "",
        lastName: lastName || "",
      },
    });

    // Generate access token
    const accessToken = jwt.sign(
      { userId: newUser.id },
      process.env.TOKEN_SECRET || "",
      { expiresIn: "15m" } // 15 minutes expiry for access token
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: newUser.id },
      process.env.TOKEN_SECRET || "",
      { expiresIn: "7d" } // 7 days expiry for refresh token
    );

    // Store the refresh token securely
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Remove password before returning user data
    const { password: userPassword, ...userInfo } = newUser;

    // Send response
    res.status(201).json({
      success: true,
      message: "User successfully registered",
      data: {
        accessToken,
        refreshToken,
        user: userInfo,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
