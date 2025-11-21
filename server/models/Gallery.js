const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: null
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['food', 'interior', 'events', 'team', 'other'],
    default: 'other'
  },
  tags: [{
    type: String
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

gallerySchema.index({ category: 1, isPublished: 1 });
gallerySchema.index({ order: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);
