import express from 'express'
import createDonation from '../resolvers/donation/createDonation.js'
import getTotalAmount from '../resolvers/donation/getTotalAmount.js'
import getAllDonation from '../resolvers/donation/getAllDonation.js'
import getSentDonation from '../resolvers/donation/getSentDonation.js'

const router = express.Router();
router.post('/create-donation',createDonation)
router.get('/total-earnings/:userId', getTotalAmount)
router.get('/recieved/:userId', getAllDonation)
router.get('/search-donations/:userId',getSentDonation)




export default router;
