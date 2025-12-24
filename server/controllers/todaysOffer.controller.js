const TodaysOffer = require('../models/TodaysOffer');

// @desc    Get all active today's offers
// @route   GET /api/todays-offers
// @access  Public
exports.getActiveOffers = async (req, res) => {
  try {
    const offers = await TodaysOffer.find({ 
      isActive: true,
      validUntil: { $gte: new Date() }
    }).sort('-createdAt');
    
    res.json({ data: offers });
  } catch (error) {
    console.error('Error fetching active offers:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch offers' 
    });
  }
};

// @desc    Get all today's offers (admin)
// @route   GET /api/todays-offers/all
// @access  Private/Admin
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await TodaysOffer.find().sort('-createdAt');
    res.json({ data: offers });
  } catch (error) {
    console.error('Error fetching all offers:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch offers' 
    });
  }
};

// @desc    Get single offer by ID
// @route   GET /api/todays-offers/:id
// @access  Public
exports.getOfferById = async (req, res) => {
  try {
    const offer = await TodaysOffer.findById(req.params.id);
    
    if (!offer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Offer not found' 
      });
    }
    
    res.json(offer);
  } catch (error) {
    console.error('Error fetching offer:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch offer' 
    });
  }
};

// @desc    Create new offer
// @route   POST /api/todays-offers
// @access  Private/Admin
exports.createOffer = async (req, res) => {
  try {
    const { title, description, discount, image, validUntil, isActive } = req.body;
    
    const offer = await TodaysOffer.create({
      title,
      description,
      discount,
      image,
      validUntil,
      isActive: isActive !== undefined ? isActive : true
    });
    
    res.status(201).json(offer);
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Failed to create offer' 
    });
  }
};

// @desc    Update offer
// @route   PUT /api/todays-offers/:id
// @access  Private/Admin
exports.updateOffer = async (req, res) => {
  try {
    const { title, description, discount, image, validUntil, isActive } = req.body;
    
    const offer = await TodaysOffer.findById(req.params.id);
    
    if (!offer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Offer not found' 
      });
    }
    
    // Update fields
    if (title !== undefined) offer.title = title;
    if (description !== undefined) offer.description = description;
    if (discount !== undefined) offer.discount = discount;
    if (image !== undefined) offer.image = image;
    if (validUntil !== undefined) offer.validUntil = validUntil;
    if (isActive !== undefined) offer.isActive = isActive;
    
    await offer.save();
    
    res.json(offer);
  } catch (error) {
    console.error('Error updating offer:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Failed to update offer' 
    });
  }
};

// @desc    Delete offer
// @route   DELETE /api/todays-offers/:id
// @access  Private/Admin
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await TodaysOffer.findById(req.params.id);
    
    if (!offer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Offer not found' 
      });
    }
    
    await offer.deleteOne();
    
    res.json({ 
      success: true, 
      message: 'Offer deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting offer:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete offer' 
    });
  }
};

// @desc    Toggle offer status
// @route   PATCH /api/todays-offers/:id/toggle
// @access  Private/Admin
exports.toggleOfferStatus = async (req, res) => {
  try {
    const offer = await TodaysOffer.findById(req.params.id);
    
    if (!offer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Offer not found' 
      });
    }
    
    offer.isActive = !offer.isActive;
    await offer.save();
    
    res.json(offer);
  } catch (error) {
    console.error('Error toggling offer status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to toggle offer status' 
    });
  }
};
