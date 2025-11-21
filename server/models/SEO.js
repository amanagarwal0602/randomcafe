const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true,
    enum: ['home', 'menu', 'about', 'gallery', 'contact', 'reservations']
  },
  title: {
    type: String,
    required: true,
    maxlength: 60
  },
  description: {
    type: String,
    required: true,
    maxlength: 160
  },
  keywords: [{
    type: String
  }],
  ogImage: {
    type: String,
    default: null
  },
  canonicalUrl: {
    type: String,
    default: null
  },
  schema: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SEO', seoSchema);
