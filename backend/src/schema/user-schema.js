import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    receivedDonations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donation",
      },
    ],
    profileId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profileId",
      },
    ],
    BankCard: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bankCard",
      },
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
