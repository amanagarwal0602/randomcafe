const mongoose = require('mongoose');

const aboutSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800'
  },
  missionTitle: {
    type: String,
    default: ''
  },
  missionText: {
    type: String,
    default: ''
  },
  visionTitle: {
    type: String,
    default: ''
  },
  visionText: {
    type: String,
    default: ''
  },
  yearsInBusiness: {
    type: Number,
    default: 0
  },
  happyCustomers: {
    type: Number,
    default: 0
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
