const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  profilePicture: {
    type: String  // This field will store the path to the uploaded profile picture
  },
  about: {
    type: String
  },
  favorites: {
    type: [String]
  },
  notifications: {
    type: Boolean
  },
  security: {
    type: String,
    enum: ['Private', 'Public']
  }
}, { collection: 'userprofiles' }); // Explicitly set the collection name

module.exports = mongoose.model('Profile', ProfileSchema);
