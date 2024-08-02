const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/share', require('./routes/share'));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Sharing Service running on port ${PORT}`));
