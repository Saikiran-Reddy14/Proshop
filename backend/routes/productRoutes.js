const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const asyncHandler = require('../middleware/asyncHandler');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (products.length === 0) {
      res.status(404);
      throw new Error('No products found');
    }
    res.status(200).json(products);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.status(200).json(product);
  })
);

module.exports = router;
