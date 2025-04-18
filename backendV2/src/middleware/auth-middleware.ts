import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
  profile?: {
    profileId: string;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("Token not found in Authorization header.");
    res.status(401).json({
      success: false,
      message: "Access token missing. Please log in.",
    });
    return;
  }

  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired access token.",
      });
    }

    req.user = { userId: (decoded as any).userId };
    req.profile = { profileId: (decoded as any).profileId };
    next();
  });
};
