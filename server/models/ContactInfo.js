const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    default: 'Lumière Café'
  },
  tagline: {
    type: String,
    default: 'Premium Coffee & Dining Experience'
  },
  email: {
    type: String,
    required: true,
    default: 'info@lumierecafe.com'
  },
  phone: {
    type: String,
    required: true,
    default: '+1 (555) 123-4567'
  },
  address: {
    street: {
      type: String,
      default: '123 Main Street'
    },
    city: {
      type: String,
      default: 'New York'
    },
    state: {
      type: String,
      default: 'NY'
    },
    zipCode: {
      type: String,
      default: '10001'
    },
    country: {
      type: String,
      default: 'USA'
    }
  },
  hours: {
    monday: { type: String, default: '8:00 AM - 9:00 PM' },
    tuesday: { type: String, default: '8:00 AM - 9:00 PM' },
    wednesday: { type: String, default: '8:00 AM - 9:00 PM' },
    thursday: { type: String, default: '8:00 AM - 9:00 PM' },
    friday: { type: String, default: '8:00 AM - 10:00 PM' },
    saturday: { type: String, default: '9:00 AM - 10:00 PM' },
    sunday: { type: String, default: '9:00 AM - 8:00 PM' }
  },
  socialMedia: {
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    youtube: { type: String, default: '' }
  },
  mapEmbedUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
