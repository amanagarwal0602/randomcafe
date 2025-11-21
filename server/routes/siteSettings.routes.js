const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getSiteSettings, updateSiteSettings } = require('../controllers/siteSettings.controller');

router.get('/', getSiteSettings);
router.put('/', protect, authorize('admin'), updateSiteSettings);

module.exports = router;
