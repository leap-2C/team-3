import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    donorId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      enum: [1, 2, 5, 10],
      default: 1,
      required: true,
    },
    socialURLOrBuyMeACoffee: {
      type: String,
    },
    recipientId: {
      type: String,
    },

    specialMessage: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", DonationSchema);

export default Donation;
