const HeroSection = require('../models/HeroSection');

// Get hero section
exports.getHero = async (req, res) => {
  try {
    let hero = await HeroSection.findOne();
    if (!hero) {
      hero = await HeroSection.create({});
    }
    res.json(hero);
  } catch (error) {
    console.error('Get hero error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update hero section
exports.updateHero = async (req, res) => {
  try {
    let hero = await HeroSection.findOne();
    if (!hero) {
      hero = await HeroSection.create(req.body);
    } else {
      hero = await HeroSection.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json(hero);
  } catch (error) {
    console.error('Update hero error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
