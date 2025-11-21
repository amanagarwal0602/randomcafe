const Review = require('../models/Review');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { menuItem, order, rating, title, comment } = req.body;

    // Check if user has ordered this item (optional verification)
    let isVerifiedPurchase = false;
    if (order) {
      const userOrder = await Order.findOne({
        _id: order,
        user: req.user.id,
        status: { $in: ['delivered', 'completed'] }
      });

      if (userOrder) {
        isVerifiedPurchase = true;
      }
    }

    // Check if user already reviewed this item
    const existingReview = await Review.findOne({
      user: req.user.id,
      menuItem
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this item'
      });
    }

    const review = await Review.create({
      user: req.user.id,
      menuItem,
      order,
      rating,
      title,
      comment,
      isVerifiedPurchase
    });

    // Update menu item rating
    const reviews = await Review.find({ menuItem, isPublished: true });
    const avgRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;
    
    await MenuItem.findByIdAndUpdate(menuItem, {
      rating: avgRating,
      reviewCount: reviews.length
    });

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name avatar')
      .populate('menuItem', 'name');

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: populatedReview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const { menuItem, rating, page = 1, limit = 10 } = req.query;

    const query = { isPublished: true };
    
    if (menuItem) {
      query.menuItem = menuItem;
    }

    if (rating) {
      query.rating = Number(rating);
    }

    const skip = (page - 1) * limit;
    const reviews = await Review.find(query)
      .populate('user', 'name avatar')
      .populate('menuItem', 'name image')
      .sort('-createdAt')
      .skip(skip)
      .limit(Number(limit));

    const total = await Review.countDocuments(query);

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's reviews
// @route   GET /api/reviews/my-reviews
// @access  Private
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate('menuItem', 'name image')
      .sort('-createdAt');

    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check ownership
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review'
      });
    }

    const { rating, title, comment } = req.body;

    review = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, title, comment },
      { new: true, runValidators: true }
    ).populate('user', 'name avatar');

    // Recalculate menu item rating
    const reviews = await Review.find({ menuItem: review.menuItem, isPublished: true });
    const avgRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;
    
    await MenuItem.findByIdAndUpdate(review.menuItem, {
      rating: avgRating,
      reviewCount: reviews.length
    });

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check ownership or admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    const menuItemId = review.menuItem;
    await review.deleteOne();

    // Recalculate menu item rating
    const reviews = await Review.find({ menuItem: menuItemId, isPublished: true });
    const avgRating = reviews.length > 0 
      ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length 
      : 0;
    
    await MenuItem.findByIdAndUpdate(menuItemId, {
      rating: avgRating,
      reviewCount: reviews.length
    });

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add admin response to review
// @route   PUT /api/reviews/:id/respond
// @access  Private/Admin
exports.respondToReview = async (req, res) => {
  try {
    const { text } = req.body;

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        response: {
          text,
          respondedBy: req.user.id,
          respondedAt: new Date()
        }
      },
      { new: true }
    ).populate('user', 'name avatar');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      message: 'Response added successfully',
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
