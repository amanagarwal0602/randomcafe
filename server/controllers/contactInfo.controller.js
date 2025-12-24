const ContactInfo = require('../models/ContactInfo');
const ContactMessage = require('../models/ContactMessage');

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
    
    // Save message to database
    const contactMessage = await ContactMessage.create({ name, email, message });
    
    console.log('Contact Message Received:');
    console.log('From:', name, '<' + email + '>');
    console.log('Message:', message);
    console.log('---');
    
    res.json({ 
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: contactMessage
    });
  } catch (error) {
    console.error('Send contact message error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send message. Please try again.' 
    });
  }
};

// Get all contact messages (admin only)
exports.getAllContactMessages = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    
    const skip = (page - 1) * limit;
    const messages = await ContactMessage.find(query)
      .sort('-createdAt')
      .skip(skip)
      .limit(Number(limit));
    
    const total = await ContactMessage.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        messages,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch messages' 
    });
  }
};

// Update message status
exports.updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, replyMessage } = req.body;
    
    const updateData = { status };
    if (status === 'replied' && replyMessage) {
      updateData.replied = true;
      updateData.replyMessage = replyMessage;
      updateData.repliedAt = new Date();
    }
    
    const message = await ContactMessage.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ 
        success: false,
        message: 'Message not found' 
      });
    }
    
    res.json({ 
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Update message status error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to update message status' 
    });
  }
};

// Delete contact message
exports.deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const message = await ContactMessage.findByIdAndDelete(id);
    
    if (!message) {
      return res.status(404).json({ 
        success: false,
        message: 'Message not found' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete message' 
    });
  }
};
