const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('first_name').trim().notEmpty().withMessage('First name is required'),
  body('last_name').trim().notEmpty().withMessage('Last name is required'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

// Routes will be implemented in controllers
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerValidation, validate, (req, res) => {
  // Controller logic will be added
  res.status(501).json({ message: 'Register endpoint - To be implemented' });
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginValidation, validate, (req, res) => {
  // Controller logic will be added
  res.status(501).json({ message: 'Login endpoint - To be implemented' });
});

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, (req, res) => {
  // Controller logic will be added
  res.status(200).json({
    status: 'success',
    data: { user: req.user }
  });
});

// @route   POST /api/auth/logout
// @desc    Logout user / clear cookie
// @access  Private
router.post('/logout', protect, (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
});

// @route   PUT /api/auth/updatepassword
// @desc    Update password
// @access  Private
router.put('/updatepassword', protect, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], validate, (req, res) => {
  // Controller logic will be added
  res.status(501).json({ message: 'Update password endpoint - To be implemented' });
});

module.exports = router;
