import User from "../../schema/user-schema";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid token",
        });
      }

      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const newToken = jwt.sign(
        { userId: user._id },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "48h",
        }
      );

      res.cookie("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        data: {
          token: newToken,
          user,
        },
      });
    });
  } catch (err) {
    next(err);
  }
};
