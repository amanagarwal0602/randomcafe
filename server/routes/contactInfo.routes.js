const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getContactInfo, updateContactInfo } = require('../controllers/contactInfo.controller');

router.get('/', getContactInfo);
router.put('/', protect, authorize('admin'), updateContactInfo);

module.exports = router;
