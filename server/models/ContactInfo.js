const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    street: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    zipCode: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: ''
    }
  },
  hours: {
    monday: { type: String, default: '' },
    tuesday: { type: String, default: '' },
    wednesday: { type: String, default: '' },
    thursday: { type: String, default: '' },
    friday: { type: String, default: '' },
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
