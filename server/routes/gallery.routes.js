const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth');
const {
  getGalleryImages,
  uploadImage,
  updateImage,
  deleteImage,
  getCategories
} = require('../controllers/gallery.controller');

// Public routes
router.get('/', getGalleryImages);
router.get('/categories/list', getCategories);

// Protected routes - Admin only
router.post(
  '/',
  protect,
  authorize('admin', 'staff'),
  upload.single('image'),
  uploadImage
);

router.put(
  '/:id',
  protect,
  authorize('admin', 'staff'),
  updateImage
);

router.delete(
  '/:id',
  protect,
  authorize('admin', 'staff'),
  deleteImage
);

module.exports = router;
