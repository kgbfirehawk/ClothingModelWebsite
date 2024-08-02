const express = require('express');
const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile'); // Ensure this is the correct model pointing to userprofiles collection

const router = express.Router();

// Token verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    console.log('Token not provided');
    return res.status(403).send('Token is required');
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], 'secretkey'); // Adjust 'secretkey' if needed
    req.userId = decoded.userId;
    req.username = decoded.username;
    console.log('Decoded token:', decoded); // Log the decoded token for debugging
    next();
  } catch (error) {
    console.log('Token verification failed:', error);
    return res.status(401).send('Invalid token');
  }
};

// Get profile route
router.get('/', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    if (!profile) {
      console.log('Profile not found for userId:', req.userId);
      return res.status(404).send('Profile not found');
    }
    res.send(profile);
  } catch (error) {
    console.log('Server error:', error);
    res.status(500).send('Server error');
  }
});

// Update profile route
router.put('/', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      req.body,
      { new: true }
    );
    if (!profile) {
      console.log('Profile not found for userId:', req.userId);
      return res.status(404).send('Profile not found');
    }
    res.send(profile);
  } catch (error) {
    console.log('Server error:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
