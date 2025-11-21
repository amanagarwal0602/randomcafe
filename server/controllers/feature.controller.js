const Feature = require('../models/Feature');

// Get all features
exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find().sort({ order: 1 });
    res.json(features);
  } catch (error) {
    console.error('Get features error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get active features
exports.getActiveFeatures = async (req, res) => {
  try {
    const features = await Feature.find({ isActive: true }).sort({ order: 1 });
    res.json(features);
  } catch (error) {
    console.error('Get active features error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create feature
exports.createFeature = async (req, res) => {
  try {
    const feature = await Feature.create(req.body);
    res.status(201).json(feature);
  } catch (error) {
    console.error('Create feature error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update feature
exports.updateFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    res.json(feature);
  } catch (error) {
    console.error('Update feature error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete feature
exports.deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    res.json({ message: 'Feature deleted successfully' });
  } catch (error) {
    console.error('Delete feature error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
