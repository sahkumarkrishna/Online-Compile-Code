// authRoutes.js
import express from 'express';
import {
  signup,
  login,
  logout,
  updateProfile,
} from '../controllers/authController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Protected Routes
router.put('/update-profile', authMiddleware, updateProfile);

export default router;
