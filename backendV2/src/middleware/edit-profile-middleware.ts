import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  profile?: {
    profileId: string;
  };
}

export const checkProfileEdit = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const profileIdFromParams = req.params.profileId;
    const profileIdFromToken = req.profile?.profileId;

    console.log("Token:", profileIdFromToken, "Params:", profileIdFromParams);

    if (!profileIdFromToken) {
      throw new Error("You must be logged in to edit a profile.");
    }

    if (profileIdFromParams != profileIdFromToken) {
      throw new Error("You are not authorized to edit this profile.");
    }
    next();
  } catch (err: any) {

    if (err.message === "You must be logged in to edit a profile.") {
       res.status(401).json({
        success: false,
        message: err.message,
      });
    }

    if (err.message === "You are not authorized to edit this profile.") {
       res.status(403).json({
        success: false,
        message: err.message,
      });
    }

    console.error("Unexpected error in checkProfileEdit:", err);
     res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};
