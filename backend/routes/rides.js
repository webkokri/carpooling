const express = require('express');
const { body, query } = require('express-validator');
const { validate } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const createRideValidation = [
  body('vehicle_id').isInt().withMessage('Valid vehicle ID is required'),
  body('origin').trim().notEmpty().withMessage('Origin is required'),
  body('destination').trim().notEmpty().withMessage('Destination is required'),
  body('departure_time').isISO8601().withMessage('Valid departure time is required'),
  body('available_seats').isInt({ min: 1, max: 8 }).withMessage('Available seats must be between 1 and 8'),
  body('price_per_seat').isFloat({ min: 0 }).withMessage('Price per seat must be a positive number')
];

const searchRidesValidation = [
  query('origin').optional().trim(),
  query('destination').optional().trim(),
  query('date').optional().isISO8601().withMessage('Valid date is required'),
  query('seats').optional().isInt({ min: 1 }).withMessage('Seats must be at least 1')
];

// @route   GET /api/rides
// @desc    Get all rides / Search rides
// @access  Public
router.get('/', searchRidesValidation, validate, (req, res) => {
  // Controller logic will be added
  res.status(501).json({ message: 'Get rides endpoint - To be implemented' });
});

// @route   GET /api/rides/:id
// @desc    Get single ride by ID
// @access  Public
router.get('/:id', (req, res) => {
  // Controller logic will be added
  res.status(501).json({ message: 'Get ride by ID endpoint - To be implemented' });
});

// @route   POST /api/rides
// @desc    Create a new ride
// @access  Private
router.post('/', protect, createRideValidation, validate, (req, res) => {
  // Controller logic will be added
  res.status(501).json({ message: 'Create ride endpoint - To be implemented' });
});

// @route   PUT /api/rides/:id
// @desc    Update ride
// @access  Private (Only ride owner)
router.put('/:id', protect, (req, res) => {
  // Controller logic will be added
  res.status(501).json({ message: 'Update ride endpoint - To be implemented' });
});

// @route   DELETE /api/rides/:id
// @desc    Delete/Cancel ride
// @access  Private (Only ride owner)
router.delete('/:id', protect, (req, res) => {
  // Controller logic will be added
  res.status(501).json({ message: 'Delete ride endpoint - To be implemented' });
});

// @route   GET /api/rides/user/my-rides
// @desc    Get current user's rides (as driver)
// @access  Private
router.get('/user/my-rides', protect, (req, res) => {
  // Controller logic will be added
  res.status(501).json({ message: 'Get my rides endpoint - To be implemented' });
});

module.exports = router;
