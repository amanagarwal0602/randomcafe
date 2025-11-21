const Coupon = require('../models/Coupon');

// Get all coupons (admin)
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 }).populate('createdBy', 'name email');
    res.json(coupons);
  } catch (error) {
    console.error('Get coupons error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get active coupons (public)
exports.getActiveCoupons = async (req, res) => {
  try {
    const now = new Date();
    const coupons = await Coupon.find({
      isActive: true,
      validFrom: { $lte: now },
      validUntil: { $gte: now }
    }).select('code description discountType discountValue minOrderAmount validUntil');
    
    res.json(coupons);
  } catch (error) {
    console.error('Get active coupons error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Validate and get coupon details
exports.validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    
    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }
    
    // Check if coupon is valid
    const validationResult = coupon.isValid();
    if (!validationResult.valid) {
      return res.status(400).json({ message: validationResult.message });
    }
    
    // Calculate discount
    const discountResult = coupon.calculateDiscount(orderAmount || 0);
    
    res.json({
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discount: discountResult.discount,
      minOrderAmount: coupon.minOrderAmount,
      message: discountResult.message
    });
  } catch (error) {
    console.error('Validate coupon error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create coupon
exports.createCoupon = async (req, res) => {
  try {
    const couponData = {
      ...req.body,
      code: req.body.code.toUpperCase(),
      createdBy: req.user._id
    };
    
    const coupon = await Coupon.create(couponData);
    console.log('Coupon created:', coupon.code);
    res.status(201).json(coupon);
  } catch (error) {
    console.error('Create coupon error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update coupon
exports.updateCoupon = async (req, res) => {
  try {
    const { code, ...updateData } = req.body;
    
    if (code) {
      updateData.code = code.toUpperCase();
    }
    
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    
    console.log('Coupon updated:', coupon.code);
    res.json(coupon);
  } catch (error) {
    console.error('Update coupon error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete coupon
exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    
    console.log('Coupon deleted:', coupon.code);
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error('Delete coupon error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Toggle coupon active status
exports.toggleCouponStatus = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    
    coupon.isActive = !coupon.isActive;
    await coupon.save();
    
    console.log('Coupon status toggled:', coupon.code, 'Active:', coupon.isActive);
    res.json(coupon);
  } catch (error) {
    console.error('Toggle coupon error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Increment usage count (called when order is placed)
exports.incrementUsage = async (couponId) => {
  try {
    await Coupon.findByIdAndUpdate(couponId, {
      $inc: { usedCount: 1 }
    });
  } catch (error) {
    console.error('Increment usage error:', error);
  }
};
