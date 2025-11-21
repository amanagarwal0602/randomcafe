const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  changePassword,
  toggleFavorite,
  getFavorites
} = require('../controllers/user.controller');

// All routes require authentication
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', upload.single('avatar'), updateProfile);

router.put(
  '/change-password',
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters')
  ],
  validate,
  changePassword
);

router.get('/favorites', getFavorites);
router.put('/favorites/:itemId', toggleFavorite);

module.exports = router;
