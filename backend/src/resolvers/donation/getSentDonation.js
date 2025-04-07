import donation from '../../schema/donation-schema.js'
const getSentDonation =async (req,res)=>{
    const id = req.params.userId
    try{
        const sentDonations = await donation.find({donorId:id})
        if (sentDonations.length === 0 ) {
            res.send("this mf never spent $")
            console.log("this mf never spent $");
            
        } else{
        res.send(sentDonations)
        console.log();
        
        } 
    } catch (error){
        res.send(error)
        console.log(error);
        
    }



}
export default getSentDonation