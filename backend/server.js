const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
dotenv.config();
const port = process.env.PORT || 5000;
const products = require('./data/products');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/product/:id', (req, res) => {
  const product = products?.default?.filter((p) => p._id === req.params.id);
  res.json(product);
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(process.env.PORT);
});
