const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new schema for the user profile
const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  about: {
    type: String,
    required: true
  },
  avatarImage: {
    type: String,
    required: true,
    default: 'https://example.com/default-profile-pic.jpg',
  },
  socialMediaURL: {
    type: String,
    required: true
  },
  backgroundImage: {
    type: String
  },
  successMessage: {
    type: String
  },

  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});




const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
