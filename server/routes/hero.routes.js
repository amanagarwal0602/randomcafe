const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getHero, updateHero } = require('../controllers/hero.controller');

router.get('/', getHero);
router.put('/', protect, authorize('admin'), updateHero);

module.exports = router;
