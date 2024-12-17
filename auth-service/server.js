require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.log('MongoDB Atlas connection error:', err));

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
