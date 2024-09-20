const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const products = [
    { id: 1, title: "Iphone", description: "Apple Inc", price: 5.2, brand: "Microsoft" },
    { id: 2, title: "Laptop", description: "IKEA Furnitures", price: 5.2, brand: "Spotify" },
    { id: 3, title: "Mobile", description: "Nokia Communications", price: 5.2, brand: "Nokia" },
    { id: 4, title: "Iphone", description: "Apple Inc", price: 5.2, brand: "Microsoft" },
    { id: 5, title: "Laptop", description: "IKEA Furnitures", price: 5.2, brand: "Spotify" },
    { id: 6, title: "Mobile", description: "Nokia Communications", price: 5.2, brand: "Nokia" },
    { id: 7, title: "Iphone", description: "Apple Inc", price: 5.2, brand: "Microsoft" },
    { id: 8, title: "Laptop", description: "IKEA Furnitures", price: 5.2, brand: "Spotify" },
    { id: 9, title: "Mobile", description: "Nokia Communications", price: 5.2, brand: "Nokia" },
    { id: 10, title: "Iphone", description: "Apple Inc", price: 5.2, brand: "Microsoft" },
    { id: 11, title: "Laptop", description: "IKEA Furnitures", price: 5.2, brand: "Spotify" },
    { id: 12, title: "Mobile", description: "Nokia Communications", price: 5.2, brand: "Nokia" },
];

app.get('/products', (req, res) => {
    res.json(products);
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
