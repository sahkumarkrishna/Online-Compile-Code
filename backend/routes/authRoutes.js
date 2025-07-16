const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  logout,
  updateProfile,
} = require('../controllers/authController');
const authMiddleware = require('../Middleware/authMiddleware');

// Public Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Protected Routes
router.put('/update-profile', authMiddleware, updateProfile);

module.exports = router;
