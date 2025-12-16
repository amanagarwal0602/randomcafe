const mongoose = require('mongoose');

const todaysOfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  discount: {
    type: String,
    required: true,
    default: '20% OFF'
  },
  image: {
    type: String,
    default: ''
  },
  validUntil: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Method to check if offer is still valid
todaysOfferSchema.methods.isValid = function() {
  return this.isActive && new Date() <= this.validUntil;
};

module.exports = mongoose.model('TodaysOffer', todaysOfferSchema);
