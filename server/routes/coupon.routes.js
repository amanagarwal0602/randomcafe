const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllCoupons,
  getActiveCoupons,
  validateCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus
} = require('../controllers/coupon.controller');

// Public routes
router.get('/active', getActiveCoupons);
router.post('/validate', validateCoupon);

// Admin routes
router.get('/', protect, authorize('admin'), getAllCoupons);
router.post('/', protect, authorize('admin'), createCoupon);
router.put('/:id', protect, authorize('admin'), updateCoupon);
router.delete('/:id', protect, authorize('admin'), deleteCoupon);
router.patch('/:id/toggle', protect, authorize('admin'), toggleCouponStatus);

module.exports = router;
