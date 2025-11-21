const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllFeatures,
  getActiveFeatures,
  createFeature,
  updateFeature,
  deleteFeature
} = require('../controllers/feature.controller');

router.get('/', getActiveFeatures);
router.get('/all', protect, authorize('admin'), getAllFeatures);
router.post('/', protect, authorize('admin'), createFeature);
router.put('/:id', protect, authorize('admin'), updateFeature);
router.delete('/:id', protect, authorize('admin'), deleteFeature);

module.exports = router;
