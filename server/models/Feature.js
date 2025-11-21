const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
    default: '☕'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feature', featureSchema);
