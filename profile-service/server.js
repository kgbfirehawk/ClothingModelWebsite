const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoURI = 'mongodb+srv://belinak:sFxE9sivgN2LtQNz@logininfo.ch4cdzu.mongodb.net/?retryWrites=true&w=majority&appName=LoginInfo';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.log('MongoDB Atlas connection error:', err));

app.use('/api/profile', require('./routes/profileRoutes'));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Profile service running on port ${PORT}`));
