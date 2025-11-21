const ContactInfo = require('../models/ContactInfo');

// Get contact info
exports.getContactInfo = async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      contactInfo = await ContactInfo.create({});
    }
    res.json(contactInfo);
  } catch (error) {
    console.error('Get contact info error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update contact info
exports.updateContactInfo = async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      contactInfo = await ContactInfo.create(req.body);
    } else {
      contactInfo = await ContactInfo.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json(contactInfo);
  } catch (error) {
    console.error('Update contact info error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
