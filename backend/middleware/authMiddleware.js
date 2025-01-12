const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const User = require('../models/userModel');

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  // Get the jwt from the cookie
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      console.log(error.name);

      res.status(401);
      throw new Error('Not authorized: Invalid or expired token.');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized: Token not found. Please log in.');
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Access denied: Administrator privileges required.');
  }
};

module.exports = { protect, admin };
