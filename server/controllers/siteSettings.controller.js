const SiteSettings = require('../models/SiteSettings');

// Get site settings
exports.getSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    console.error('Get site settings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update site settings
exports.updateSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json(settings);
  } catch (error) {
    console.error('Update site settings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
