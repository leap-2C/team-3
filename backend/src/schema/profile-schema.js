import mongoose from "mongoose";
import Donation from "./donation-schema";

const DonationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  about: {
    type: String,
    required: true,
  },
  avatarImage: {
    type: String,
    required: true,
    default: "https://example.com/default-profile-pic.jpg",
  },
  socialMediaURL: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
  },
  successMessage: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Donation = mongoose.model("Donation", DonationSchema);

export default Donation;
