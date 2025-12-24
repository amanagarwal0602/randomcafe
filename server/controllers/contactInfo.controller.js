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

// Send contact message
exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // TODO: In production, integrate with email service (SendGrid, Mailgun, etc.)
    // For now, just log the message and return success
    console.log('Contact Message Received:');
    console.log('From:', name, '<' + email + '>');
    console.log('Message:', message);
    console.log('---');
    
    // You can also save messages to database if needed
    // const contactMessage = await ContactMessage.create({ name, email, message });
    
    res.json({ 
      success: true,
      message: 'Thank you for your message! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Send contact message error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send message. Please try again.' 
    });
  }
};
