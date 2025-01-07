const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/productModel');

// Get all products
const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  if (products.length === 0) {
    res.status(404);
    throw new Error('No products found');
  }
  res.status(200).json(products);
  next();
});

// Get product by ID
const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.status(200).json(product);
  next();
});

module.exports = { getProducts, getProductById };
