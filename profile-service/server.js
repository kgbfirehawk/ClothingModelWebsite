require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Profile = require('./models/Profile'); // Ensure the Profile model is correctly imported

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.log('MongoDB Atlas connection error:', err));

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route for handling file uploads and updating the profile picture in the database
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const profilePicturePath = `/uploads/${req.file.filename}`;

    // Assuming you identify the user with a token and find their profile
    const token = req.headers['authorization'].replace('Bearer ', '');
    const userProfile = await Profile.findOneAndUpdate(
      { token }, // Modify this if you use a different way to identify users, e.g., userId
      { profilePicture: profilePicturePath },
      { new: true }
    );

    if (!userProfile) {
      return res.status(404).send('User not found.');
    }

    res.json({ filePath: profilePicturePath });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ error: 'Server error while uploading the file.' });
  }
});

// Profile Routes
app.use('/api/profile', require('./routes/profileRoutes'));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Profile service running on port ${PORT}`));
