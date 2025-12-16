const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getActiveOffers,
  getAllOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
  toggleOfferStatus
} = require('../controllers/todaysOffer.controller');

// Public routes
router.get('/', getActiveOffers);
router.get('/:id', getOfferById);

// Admin routes
router.get('/all', protect, authorize('admin', 'staff'), getAllOffers);
router.post('/', protect, authorize('admin', 'staff'), createOffer);
router.put('/:id', protect, authorize('admin', 'staff'), updateOffer);
router.delete('/:id', protect, authorize('admin', 'staff'), deleteOffer);
router.patch('/:id/toggle', protect, authorize('admin', 'staff'), toggleOfferStatus);

module.exports = router;
