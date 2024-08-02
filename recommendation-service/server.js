const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/recommendation-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/recommendations', require('./routes/recommendations'));

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Recommendation Service running on port ${PORT}`));
