const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const products = require('./data/products');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());

connectDB();

app.use('/api/products', productRoutes);
app.use(express.json());

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(process.env.PORT);
});
