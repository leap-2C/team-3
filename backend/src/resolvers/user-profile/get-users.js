import User from "../../schema/user-schema.js";

// GET /profile/explore (buh hereglegchiin profile-g avah)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("profileId");
    const profiles = users.map((user) => user.profileId[0]).filter(Boolean);
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};