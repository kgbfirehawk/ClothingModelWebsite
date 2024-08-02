const express = require('express');
const Outfit = require('../models/Outfit');

const router = express.Router();

router.get('/', async (req, res) => {
  const { userId } = req.query;
  const outfits = await Outfit.find({ userId });
  res.json({ recommendations: outfits });
});

module.exports = router;
