const Gallery = require('../models/Gallery');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
exports.getGalleryImages = async (req, res) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;

    const query = { isPublished: true };
    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;
    const images = await Gallery.find(query)
      .sort('order -createdAt')
      .skip(skip)
      .limit(Number(limit))
      .populate('uploadedBy', 'name');

    const total = await Gallery.countDocuments(query);

    res.json({
      success: true,
      data: {
        images,
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

// @desc    Upload gallery image
// @route   POST /api/gallery
// @access  Private/Admin
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    const { title, description, category, tags } = req.body;

    const image = await Gallery.create({
      title,
      description,
      image: `/uploads/gallery/${req.file.filename}`,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      uploadedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: image
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update gallery image
// @route   PUT /api/gallery/:id
// @access  Private/Admin
exports.updateImage = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.body.tags && typeof req.body.tags === 'string') {
      updates.tags = req.body.tags.split(',').map(tag => tag.trim());
    }

    const image = await Gallery.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    res.json({
      success: true,
      message: 'Image updated successfully',
      data: image
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    await image.deleteOne();

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get gallery categories
// @route   GET /api/gallery/categories/list
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Gallery.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: categories.map(cat => ({
        category: cat._id,
        count: cat.count
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
