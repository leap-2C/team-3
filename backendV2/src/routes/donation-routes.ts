import express from 'express'
import createDonation from '../resolvers/donation/create-donation';
import getTotalAmount from '../resolvers/donation/get-total-amount';
import getSentDonation from '../resolvers/donation/get-sent-donation';
import getAllDonation from '../resolvers/donation/get-all-donation';
const route = express.Router()
route.post('/create-donation', createDonation)
route.get('/total-earnings/:userId', getTotalAmount)
route.get('/search-donations/:userId', getSentDonation)
route.get('/recieved/:userId', getAllDonation)
export default route;