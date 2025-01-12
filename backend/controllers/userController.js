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
  const { name, email, password } = req.body;

  // Check if required fields are present
  if (!name.trim() || !email.trim() || !password.trim()) {
    res.status(400);
    throw new Error(
      'Please provide all required fields (name, email, password)'
    );
  }

  // Check if user already exists
  const exists = await User.findOne({ email });

  if (exists) {
    res.status(400);
    throw new Error('User already exists');
  } else {
    // Hash password before saving
    const pwd = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: pwd });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Set JWT as an HTTP-Only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Ensure this is correctly set in production
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Send response with a success message and user info (excluding password)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
});

// logout user and clear cookie
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json('Logged out successfully');
});

// get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    // Update user name and email if provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // If a new password is provided, hash it before saving
    if (req.body.password) {
      // Validate password length or other criteria if needed
      if (req.body.password.length < 6) {
        res.status(400);
        throw new Error('Password must be at least 6 characters long');
      }

      user.password = await bcrypt.hash(req.body.password, 12);
    }

    // If email is updated, check for duplicates
    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        res.status(400);
        throw new Error('Email is already in use');
      }
    }

    // Save updated user data
    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
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
