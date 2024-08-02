const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/notify', require('./routes/notify'));

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));
