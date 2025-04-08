import donationSchema from '../../schema/donation-schema.js';
import userSchema from '../../schema/user-schema.js';

const createDonation = async (req, res) => {
  const { recipientId, donorId, amount, specialMessage } = req.body;

  
  const reciever = await userSchema.findById(recipientId);
  const donor = await userSchema.findById(donorId);

  if (!reciever || !donor) {
    return res.json({ error: 'Donor or reciever not found' });
  }

  try {
    
    const donation = new donationSchema({
      recipientId,
      donorId,
      amount,
      specialMessage: specialMessage || '',
    });

   
    await donation.save();

  
    reciever.receivedDonations.push(donation._id);
    await reciever.save(); 

    res.status(201).json({
      message: 'Donation created ',
      donation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating donation' });
  }
};

export default createDonation;
// {
//   "recipientId": "",
//   "donorId" :"",
//   "amount" :"10"
//   }