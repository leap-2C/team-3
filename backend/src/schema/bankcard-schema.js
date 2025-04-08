import mongoose from "mongoose";

const BankCardSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{16}$/,
    },
    country: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  
  },
  { timestamps: true }
);

const BankCard = mongoose.model("BankCard", BankCardSchema);

export default BankCard;
