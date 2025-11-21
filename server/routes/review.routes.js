const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');
const {
  createReview,
  getReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  respondToReview
} = require('../controllers/review.controller');

// Validation
const reviewValidation = [
  body('menuItem').notEmpty().withMessage('Menu item is required'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('comment').trim().notEmpty().withMessage('Comment is required')
];

// Public routes
router.get('/', getReviews);

// Protected routes
router.use(protect);

router.post('/', reviewValidation, validate, createReview);
router.get('/my-reviews', getMyReviews);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

// Admin routes
router.put(
  '/:id/respond',
  authorize('admin', 'staff'),
  respondToReview
);

module.exports = router;
