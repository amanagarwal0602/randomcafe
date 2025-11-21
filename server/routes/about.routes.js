const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getAbout, updateAbout } = require('../controllers/about.controller');

router.get('/', getAbout);
router.put('/', protect, authorize('admin'), updateAbout);

module.exports = router;
