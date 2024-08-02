// model-service/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const outfits = [
  {
    head: 'blank.jpg',
    top: 'blank.jpg',
    bottom: 'blank.jpg',
    shoes: 'blank.jpg'
  },
  {
    head: 'hat.png',
    top: 'red-shirt.png',
    bottom: 'blue-jeans.png',
    shoes: 'sneakers.png'
  },
  {
    head: 'cap.png',
    top: 'green-shirt.png',
    bottom: 'black-jeans.png',
    shoes: 'boots.png'
  },
  {
    head: 'beanie.png',
    top: 'blue-shirt.png',
    bottom: 'white-jeans.png',
    shoes: 'sandals.png'
  }
];

app.get('/outfit', (req, res) => {
  res.json(outfits);
});

app.listen(5002, () => {
  console.log('Model service running on port 5002');
});
