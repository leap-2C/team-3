import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  profile?: {
    profileId: string;
  };
}

export const checkProfileEdit = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const profileIdFromParams = req.params.profileId;
  const profileIdFromToken = req.profile?.profileId;

  if (!profileIdFromToken) {
    res.status(401).json({
    success: false,
    message: "You must be logged in to edit a profile.",
    });
  }

  if (profileIdFromParams !== profileIdFromToken) {
    res.status(403).json({
    success: false,
    message: "You are not authorized to edit this profile.",
    });
  }

  next();
};
