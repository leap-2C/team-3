export const patchBankCard = async (req, res)=>{
    const { bankCardId } = req.params;
    try {
      const updatedBankCard = await BankCard.findByIdAndUpdate(
        bankCardId,
        req.body,
        { new: true }
      );
      if (!updatedBankCard) {
        return res.status(404).json({ message: "Bank card not found" });
      }
      res
        .status(200)
        .json({
          message: "Bank card updated successfully",
          data: updatedBankCard,
        });
    } catch (err) {
      console.log("Error on PATCH bankcard:", err);
    }
}