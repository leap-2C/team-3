import Donation from "../../schema/profile-schema.js";

// PATCH /profile/:profileId (profile-n medeelle zasah shinechleh)
export const updateProfile = async (req, res) => {
  try {
    const updated = await Donation.findByIdAndUpdate(   ///Donation-g zasna
      req.params.profileId,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Profile not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
