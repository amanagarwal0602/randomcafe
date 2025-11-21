const mongoose = require('mongoose');

const aboutSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'About Us'
  },
  heading: {
    type: String,
    required: true,
    default: 'Our Story'
  },
  description: {
    type: String,
    required: true,
    default: 'Founded in 2020, Lumière Café has been serving exceptional coffee and cuisine to our community.'
  },
  content: {
    type: String,
    required: true,
    default: 'We believe in quality ingredients, expert preparation, and warm hospitality. Every dish is crafted with care, every coffee brewed to perfection.'
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800'
  },
  missionTitle: {
    type: String,
    default: 'Our Mission'
  },
  missionText: {
    type: String,
    default: 'To create memorable dining experiences through quality, creativity, and exceptional service.'
  },
  visionTitle: {
    type: String,
    default: 'Our Vision'
  },
  visionText: {
    type: String,
    default: 'To be the community\'s favorite gathering place for coffee, food, and connection.'
  },
  yearsInBusiness: {
    type: Number,
    default: 4
  },
  happyCustomers: {
    type: Number,
    default: 10000
  },
  menuItems: {
    type: Number,
    default: 50
  },
  awards: {
    type: Number,
    default: 5
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AboutSection', aboutSectionSchema);
