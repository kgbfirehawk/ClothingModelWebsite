const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  profilePicture: { type: String, default: '' },
  about: { type: String, default: '' },
  favorites: { type: [String], default: [] },
  notifications: { type: Boolean, default: false },
  security: { type: String, default: 'private' }
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
