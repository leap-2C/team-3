import mongoose from "mongoose";
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    donorId: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        enum: ['1', '2','5', '10'],
        default: 1,
        required: true
    },
    socialURLOrBuyMeACoffee: {
        type: String
    },
    recipientId: {
        type: String
    },

    specialMessage: {
        type: String,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
