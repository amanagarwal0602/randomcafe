const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['breakfast', 'lunch', 'dinner', 'drinks', 'desserts', 'appetizers']
  },
  subCategory: {
    type: String,
    default: null
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  ingredients: [{
    type: String
  }],
  allergens: [{
    type: String,
    enum: ['gluten', 'dairy', 'nuts', 'eggs', 'soy', 'shellfish', 'fish']
  }],
  dietaryInfo: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'halal']
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  isSpecial: {
    type: Boolean,
    default: false
  },
  preparationTime: {
    type: Number, // in minutes
    default: 15
  },
  calories: {
    type: Number,
    default: null
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  popularity: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for filtering and sorting
menuItemSchema.index({ category: 1, isAvailable: 1 });
menuItemSchema.index({ price: 1 });
menuItemSchema.index({ rating: -1 });
menuItemSchema.index({ popularity: -1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);
