const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favoriteItems', 'name price image category');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const allowedUpdates = ['name', 'phone', 'address'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Handle avatar upload
    if (req.file) {
      updates.avatar = `/uploads/avatars/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add/Remove favorite item
// @route   PUT /api/users/favorites/:itemId
// @access  Private
exports.toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const itemId = req.params.itemId;

    const index = user.favoriteItems.indexOf(itemId);
    
    if (index > -1) {
      // Remove from favorites
      user.favoriteItems.splice(index, 1);
      await user.save();
      
      res.json({
        success: true,
        message: 'Removed from favorites',
        isFavorite: false
      });
    } else {
      // Add to favorites
      user.favoriteItems.push(itemId);
      await user.save();
      
      res.json({
        success: true,
        message: 'Added to favorites',
        isFavorite: true
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get favorites
// @route   GET /api/users/favorites
// @access  Private
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favoriteItems');

    res.json({
      success: true,
      data: user.favoriteItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
