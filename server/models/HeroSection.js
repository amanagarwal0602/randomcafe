const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Welcome to Lumière Café'
  },
  subtitle: {
    type: String,
    required: true,
    default: 'Experience the art of coffee and cuisine'
  },
  description: {
    type: String,
    default: 'Where every cup tells a story and every meal is a masterpiece'
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
