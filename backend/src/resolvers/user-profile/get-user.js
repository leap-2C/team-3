import User from "../../schema/user-schema.js";

// GET /profile/current-user (nevtersen hereglegch ooriign profile aa avah)
export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("profileId");
    if (!user || user.profileId.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(user.profileId[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};