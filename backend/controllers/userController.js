const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');

// authenticate user & get token
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (user) {
    // Check if the provided password matches the hashed password
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      // Set JWT as HTTP-Only cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  }

  // If user is not found, return an error
  res.status(401);
  throw new Error('User not found');
});

// register a new user
const registerUser = asyncHandler(async (req, res) => {
  res.send('register user');
});

// logout user and clear cookie
const logoutUser = asyncHandler(async (req, res) => {
  res.send('logout user');
});

// get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
});

// update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
});

// get all users
const getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

// delete users
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

// get user by ID
const getUserById = asyncHandler(async (req, res) => {
  res.send('get user by ID');
});

// update user
const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
