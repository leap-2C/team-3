export const createBankCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { cardNumber, country, firstName, lastName, expiryDate } = req.body;

    const savedBankCard = await BankCard.create({
      cardNumber,
      country,
      firstName,
      lastName,
      expiryDate,
      userID: id,
    });
    await savedBankCard.save();
    res
      .status(201)
      .json({ message: "Bank card saved successfully", data: savedBankCard });
  } catch (err) {
    console.log("Error on POST bankcard:", err);
  }
};
