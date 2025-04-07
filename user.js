import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  receivedDonations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'
  }],
  profileId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profileId'
  }],
  BankCard: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bankCard'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

});


const User = mongoose.model('User', userSchema);

module.exports = User;
