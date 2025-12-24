const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getContactInfo, updateContactInfo, sendContactMessage } = require('../controllers/contactInfo.controller');

router.get('/', getContactInfo);
router.post('/send-message', sendContactMessage);
router.put('/', protect, authorize('admin'), updateContactInfo);

module.exports = router;
