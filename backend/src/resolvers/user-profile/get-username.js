import User from "../../schema/user-schema.js";

// GET /profile/view/:username (Humuust profile-g username-r n haruulah)
export const getUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate("profileId");
    if (!user || user.profileId.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(user.profileId[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};