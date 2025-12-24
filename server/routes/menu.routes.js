const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth');
const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getCategories,
  toggleShowOnHomepage
} = require('../controllers/menu.controller');

// Validation
const menuItemValidation = [
  body('name').trim().notEmpty().withMessage('Item name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('category').trim().notEmpty().withMessage('Category is required')
];

// Public routes
router.get('/', getMenuItems);
router.get('/categories/list', getCategories);
router.get('/:id', getMenuItem);

// Protected routes - Admin only
router.post(
  '/',
  protect,
  authorize('admin', 'staff'),
  (req, res, next) => {
    // Only use multer if content-type is multipart/form-data
    if (req.headers['content-type']?.includes('multipart/form-data')) {
      upload.single('image')(req, res, next);
    } else {
      next();
    }
  },
  menuItemValidation,
  validate,
  createMenuItem
);

router.put(
  '/:id',
  protect,
  authorize('admin', 'staff'),
  (req, res, next) => {
    // Only use multer if content-type is multipart/form-data
    if (req.headers['content-type']?.includes('multipart/form-data')) {
      upload.single('image')(req, res, next);
    } else {
      next();
    }
  },
  updateMenuItem
);

router.delete(
  '/:id',
  protect,
  authorize('admin', 'staff'),
  deleteMenuItem
);

router.put(
  '/:id/toggle-homepage',
  protect,
  authorize('admin', 'staff'),
  toggleShowOnHomepage
);

module.exports = router;
