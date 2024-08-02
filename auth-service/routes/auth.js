const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Create a partial profile for the new user
    const userProfile = new UserProfile({
      userId: user._id,
      username: user.username,
      email: user.email
    });
    await userProfile.save();

    res.send('User registered successfully');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Registration failed');
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, 'secretkey', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Login failed');
  }
});

// Verify token route
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const verified = jwt.verify(token, 'secretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

router.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.send(user);
  } catch (error) {
    res.status(500).send('Error fetching user');
  }
});

module.exports = router;
