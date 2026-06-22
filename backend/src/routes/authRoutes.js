const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { validateInput } = require('../middleware/errorMiddleware');
const { 
  registerSchema, 
  loginSchema, 
  changePasswordSchema,
  updateProfileSchema 
} = require('../middleware/validation');

// Public routes
router.post('/register', validateInput(registerSchema), authController.register);
router.post('/login', validateInput(loginSchema), authController.login);

// Protected routes
router.get('/me', protect, authController.getCurrentUser);
router.put('/update-profile', protect, validateInput(updateProfileSchema), authController.updateProfile);
router.put('/change-password', protect, validateInput(changePasswordSchema), authController.changePassword);
router.post('/logout', protect, authController.logout);

module.exports = router;
