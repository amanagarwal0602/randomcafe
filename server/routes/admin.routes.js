const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getDashboardStats,
  getAllOrders,
  getAllReservations,
  updateReservationStatus,
  getAllUsers,
  updateUserRole,
  toggleUserActive,
  getAllReviews,
  toggleReviewPublish
} = require('../controllers/admin.controller');

// All routes require admin or staff authentication
router.use(protect);
router.use(authorize('admin', 'staff'));

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// Orders management
router.get('/orders', getAllOrders);

// Reservations management
router.get('/reservations', getAllReservations);
router.put('/reservations/:id/status', updateReservationStatus);

// Users management (admin only)
router.get('/users', authorize('admin'), getAllUsers);
router.put('/users/:id/role', authorize('admin'), updateUserRole);
router.put('/users/:id/toggle-active', authorize('admin'), toggleUserActive);

// Reviews management
router.get('/reviews', getAllReviews);
router.put('/reviews/:id/toggle-publish', toggleReviewPublish);

module.exports = router;
