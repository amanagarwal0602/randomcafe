const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');
const {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/order.controller');

// Validation
const orderValidation = [
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.menuItem').notEmpty().withMessage('Menu item ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('orderType')
    .isIn(['dine-in', 'takeout', 'delivery'])
    .withMessage('Invalid order type'),
  body('contactPhone').trim().notEmpty().withMessage('Contact phone is required'),
  body('paymentMethod')
    .isIn(['card', 'cash', 'online'])
    .withMessage('Invalid payment method')
];

// All routes require authentication
router.use(protect);

// Customer routes
router.post('/', orderValidation, validate, createOrder);
router.get('/', getMyOrders);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);

// Staff/Admin routes
router.put(
  '/:id/status',
  authorize('admin', 'staff'),
  updateOrderStatus
);

module.exports = router;
