const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankCardSchema = new Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{16}$/
  },
  country: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  expiryDate: {

    type: Date,
    required: true


  },
  userID: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


const BankCard = mongoose.model('BankCard', bankCardSchema);

module.exports = BankCard;
