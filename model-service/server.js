const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Serve static files from the frontend/public directory
app.use('/outfits', express.static(path.join(__dirname, '../frontend/public/outfits')));

const outfits = [
  {
    id: 0,
    name: "Blank",
    image: "blank.jpg"
  },
  {
    id: 1,
    name: "Red Shirt",
    category: "Shirts",
    brand: "Under Amma",
    price: 19.99,
    color: "Red",
    sizes: ["S", "M", "L"],
    material: "Cotton",
    image: "red-shirt.png"
  },
  {
    id: 2,
    name: "Blue Jeans",
    category: "Pants",
    brand: "Leni",
    price: 39.99,
    color: "Blue",
    sizes: ["30", "32", "34"],
    material: "Denim",
    image: "blue-jeans.png"
  },
  {
    id: 3,
    name: "White Sneakers",
    category: "Shoes",
    brand: "Puna",
    price: 49.99,
    color: "White",
    sizes: ["8", "9", "10"],
    material: "Leather",
    image: "sneakers.png"
  },
  {
    id: 4,
    name: "Green Shirt",
    category: "Shirts",
    brand: "Under Amma",
    price: 21.99,
    color: "Green",
    sizes: ["S", "M", "L"],
    material: "Polyester",
    image: "green-shirt.png"
  },
  {
    id: 5,
    name: "Black Jeans",
    category: "Pants",
    brand: "Kohl",
    price: 42.99,
    color: "Black",
    sizes: ["30", "32", "34"],
    material: "Denim",
    image: "black-jeans.png"
  },
  {
    id: 6,
    name: "Blue Shirt",
    category: "Shirts",
    brand: "Hayes",
    price: 22.99,
    color: "Blue",
    sizes: ["S", "M", "L"],
    material: "Cotton",
    image: "blue-shirt.png"
  },
  {
    id: 7,
    name: "White Jeans",
    category: "Pants",
    brand: "Leni",
    price: 44.99,
    color: "White",
    sizes: ["30", "32", "34"],
    material: "Denim",
    image: "white-jeans.png"
  },
  {
    id: 8,
    name: "Boots",
    category: "Shoes",
    brand: "Red ring",
    price: 69.99,
    color: "Black",
    sizes: ["9", "10", "11"],
    material: "Leather",
    image: "boots.png"
  },
  {
    id: 9,
    name: "Sandals",
    category: "Shoes",
    brand: "Duckers",
    price: 29.99,
    color: "Brown",
    sizes: ["7", "8", "9"],
    material: "Rubber",
    image: "sandals.png"
  },
  {
    id: 10,
    name: "Hat",
    category: "Headwear",
    brand: "Broto",
    price: 14.99,
    color: "Brown",
    sizes: ["One Size"],
    material: "Wool",
    image: "hat.png"
  },
  {
    id: 11,
    name: "Cap",
    category: "Headwear",
    brand: "Chompion",
    price: 12.99,
    color: "Green",
    sizes: ["One Size"],
    material: "Cotton",
    image: "cap.png"
  },
  {
    id: 12,
    name: "Beanie",
    category: "Headwear",
    brand: "Calambia",
    price: 15.99,
    color: "Red",
    sizes: ["One Size"],
    material: "Wool",
    image: "beanie.png"
  }
];

app.get('/outfit', (req, res) => {
  res.json(outfits);
});

app.listen(5002, () => {
  console.log('Model service running on port 5002');
});
