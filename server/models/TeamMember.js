const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String
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

module.exports = mongoose.model('TeamMember', teamMemberSchema);
