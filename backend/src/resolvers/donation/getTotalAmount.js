import User from "../../schema/user-schema.js";
import Donation from "../../schema/donation-schema.js";
import mongoose from "mongoose";

const getTotalDonation = async (req, res) => {
  const id = req.params.userId;

  try {
    const donOfUser = await Donation.find({ recipientId: id });
    const totalAmount = donOfUser.reduce((acc, donation) => acc + donation.amount, 0);
    res.json({
     totalAmount: totalAmount
    });
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving donations." });
  }
};

export default getTotalDonation;
