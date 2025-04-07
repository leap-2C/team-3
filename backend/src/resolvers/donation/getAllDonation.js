import Donation from "../../schema/donation-schema.js";

const getAllDonation = async (req, res) => {
  const id = req.params.userId;

  try {
  
    const donations = await Donation.find({ recipientId: id });

   
    if (donations.length === 0) {
      console.log("No donations for this user");
      res.status(404).json({ message: "No donations found for this user." });
    } else {
    
      res.json(donations);
    }
  } catch (error) {
   
   
    res.json({ error: "An error occurred while retrieving donations." });
  }
};

export default getAllDonation;
