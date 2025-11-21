const AboutSection = require('../models/AboutSection');

// Get about section
exports.getAbout = async (req, res) => {
  try {
    let about = await AboutSection.findOne();
    if (!about) {
      about = await AboutSection.create({});
    }
    res.json(about);
  } catch (error) {
    console.error('Get about error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update about section
exports.updateAbout = async (req, res) => {
  try {
    let about = await AboutSection.findOne();
    if (!about) {
      about = await AboutSection.create(req.body);
    } else {
      about = await AboutSection.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json(about);
  } catch (error) {
    console.error('Update about error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
