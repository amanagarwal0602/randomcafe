const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { 
  getContactInfo, 
  updateContactInfo, 
  sendContactMessage,
  getAllContactMessages,
  updateMessageStatus,
  deleteContactMessage
} = require('../controllers/contactInfo.controller');

router.get('/', getContactInfo);
router.post('/send-message', sendContactMessage);
router.put('/', protect, authorize('admin'), updateContactInfo);

// Contact messages management (admin only)
router.get('/messages', protect, authorize('admin', 'staff'), getAllContactMessages);
router.put('/messages/:id', protect, authorize('admin', 'staff'), updateMessageStatus);
router.delete('/messages/:id', protect, authorize('admin'), deleteContactMessage);

module.exports = router;
