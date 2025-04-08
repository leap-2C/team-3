export const getBankCard = async (req, res)=>{
    const { userId } = req.params;
  try {
    const bankCards = await BankCard.find({ userID: userId });
    res.status(200).json({ data: bankCards });
  } catch (err) {
    console.log("Error on GET bankcard:", err);
  }
}