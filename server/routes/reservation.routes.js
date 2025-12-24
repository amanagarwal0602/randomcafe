const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const {
  createReservation,
  getMyReservations,
  getReservation,
  updateReservation,
  cancelReservation,
  getAvailableSlots
} = require('../controllers/reservation.controller');

// Validation
const reservationValidation = [
  body('guestName').trim().notEmpty().withMessage('Guest name is required'),
  body('guestEmail').isEmail().withMessage('Valid email is required'),
  body('guestPhone').trim().notEmpty().withMessage('Phone number is required'),
  body('numberOfGuests')
    .isInt({ min: 1, max: 20 })
    .withMessage('Number of guests must be between 1 and 20'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('timeSlot').trim().notEmpty().withMessage('Time slot is required')
];

// Public routes
router.get('/available-slots/:date', getAvailableSlots);

// Protected routes
router.use(protect);

router.post('/', reservationValidation, validate, createReservation);
router.get('/', getMyReservations);
router.get('/:id', getReservation);
router.put('/:id', updateReservation);
router.put('/:id/status', updateReservation);
router.put('/:id/cancel', cancelReservation);

module.exports = router;
