import Donation from "../../schema/profile-schema.js";

// POST /profile/:userId (shine hereglegch uusgene)
export const createProfile = async (req, res) => {
  try {
    const profile = new Donation(req.body);  //Donation-g Profile bolgoj zasna
    await profile.save();

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profileId.push(profile._id);
    await user.save();

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};