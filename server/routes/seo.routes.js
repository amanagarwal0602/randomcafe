const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');
const {
  getSEO,
  getAllSEO,
  updateSEO
} = require('../controllers/seo.controller');

// Public route
router.get('/:page', getSEO);

// Admin routes
router.get('/', protect, authorize('admin'), getAllSEO);

router.put(
  '/:page',
  protect,
  authorize('admin'),
  [
    body('title')
      .trim()
      .isLength({ max: 60 })
      .withMessage('Title must be 60 characters or less'),
    body('description')
      .trim()
      .isLength({ max: 160 })
      .withMessage('Description must be 160 characters or less')
  ],
  validate,
  updateSEO
);

module.exports = router;
