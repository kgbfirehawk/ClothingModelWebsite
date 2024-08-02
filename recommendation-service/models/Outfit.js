const mongoose = require('mongoose');

const OutfitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  items: [{ name: String, image: String }]
});

module.exports = mongoose.model('Outfit', OutfitSchema);
