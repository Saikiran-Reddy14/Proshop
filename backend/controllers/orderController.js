const asyncHandler = require('../middleware/asyncHandler');
const Order = require('../models/orderModel');

// Create new order
// POST /api/orders
// Private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send('add order items');
});

// Get logged in user orders
// GET /api/orders/myorders
// Private
const getMyOrderItems = asyncHandler(async (req, res) => {
  res.send('get my orders');
});

// Get order by ID
// GET /api/orders/:id
// Private
const getOrderById = asyncHandler(async (req, res) => {
  res.send('get order by id');
});

// Get Update order to paid
// GET /api/orders/:id/pay
// Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('update order to paid');
});

// Get Update order to delivered
// GET /api/orders/:id/deliver
// Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order to delivered');
});

// Get Get all orders
// GET /api/orders
// Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('get all orders');
});

module.exports = {
  addOrderItems,
  getMyOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
