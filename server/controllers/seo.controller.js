const SEO = require('../models/SEO');

// @desc    Get SEO settings for a page
// @route   GET /api/seo/:page
// @access  Public
exports.getSEO = async (req, res) => {
  try {
    const seo = await SEO.findOne({ page: req.params.page });

    if (!seo) {
      return res.status(404).json({
        success: false,
        message: 'SEO settings not found for this page'
      });
    }

    res.json({
      success: true,
      data: seo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all SEO settings
// @route   GET /api/seo
// @access  Private/Admin
exports.getAllSEO = async (req, res) => {
  try {
    const seoSettings = await SEO.find().sort('page');

    res.json({
      success: true,
      data: seoSettings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update SEO settings
// @route   PUT /api/seo/:page
// @access  Private/Admin
exports.updateSEO = async (req, res) => {
  try {
    const { title, description, keywords, ogImage, canonicalUrl, schema } = req.body;

    let seo = await SEO.findOne({ page: req.params.page });

    const updates = {
      title,
      description,
      keywords,
      ogImage,
      canonicalUrl,
      schema,
      updatedBy: req.user.id
    };

    if (seo) {
      seo = await SEO.findByIdAndUpdate(
        seo._id,
        updates,
        { new: true, runValidators: true }
      );
    } else {
      seo = await SEO.create({
        page: req.params.page,
        ...updates
      });
    }

    res.json({
      success: true,
      message: 'SEO settings updated successfully',
      data: seo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
