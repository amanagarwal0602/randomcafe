const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
    default: 'percentage'
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  minOrderAmount: {
    type: Number,
    default: 0
  },
  maxDiscountAmount: {
    type: Number,
    default: null
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: null // null means unlimited
  },
  usedCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicableCategories: {
    type: [String],
    default: [] // Empty means all categories
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Method to check if coupon is valid
couponSchema.methods.isValid = function() {
  const now = new Date();
  
  if (!this.isActive) return { valid: false, message: 'This coupon is not active' };
  if (now < this.validFrom) return { valid: false, message: 'This coupon is not yet valid' };
  if (now > this.validUntil) return { valid: false, message: 'This coupon has expired' };
  if (this.usageLimit && this.usedCount >= this.usageLimit) {
    return { valid: false, message: 'This coupon has reached its usage limit' };
  }
  
  return { valid: true };
};

// Method to calculate discount
couponSchema.methods.calculateDiscount = function(orderAmount, items = []) {
  let discount = 0;
  
  // Check minimum order amount
  if (orderAmount < this.minOrderAmount) {
    return { discount: 0, message: `Minimum order amount is $${this.minOrderAmount}` };
  }
  
  // Calculate discount based on type
  if (this.discountType === 'percentage') {
    discount = (orderAmount * this.discountValue) / 100;
    
    // Apply max discount cap if set
    if (this.maxDiscountAmount && discount > this.maxDiscountAmount) {
      discount = this.maxDiscountAmount;
    }
  } else {
    // Fixed discount
    discount = this.discountValue;
  }
  
  // Don't let discount exceed order amount
  if (discount > orderAmount) {
    discount = orderAmount;
  }
  
  return { discount: Math.round(discount * 100) / 100, message: 'Coupon applied successfully' };
};

module.exports = mongoose.model('Coupon', couponSchema);
