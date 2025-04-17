import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const checkProfileEdit = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const userIdFromParams = req.params.userId;
  const userIdFromToken = req.user?.userId;

  if (!userIdFromToken) {
    res.status(401).json({
    success: false,
    message: "You must be logged in to edit a profile.",
    });
  }

  if (userIdFromParams !== userIdFromToken) {
    res.status(403).json({
    success: false,
    message: "You are not authorized to edit this profile.",
    });
  }

  next();
};
