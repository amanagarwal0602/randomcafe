const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  backgroundImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200'
  },
  primaryButtonText: {
    type: String,
    default: 'View Menu'
  },
  primaryButtonLink: {
    type: String,
    default: '/menu'
  },
  secondaryButtonText: {
    type: String,
    default: 'Reserve Table'
  },
  secondaryButtonLink: {
    type: String,
    default: '/reservations'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('HeroSection', heroSectionSchema);
