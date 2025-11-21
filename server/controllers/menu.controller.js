const MenuItem = require('../models/MenuItem');
const Review = require('../models/Review');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
exports.getMenuItems = async (req, res) => {
  try {
    const {
      category,
      dietary,
      minPrice,
      maxPrice,
      search,
      sort = '-createdAt',
      page = 1,
      limit = 20,
      isAvailable
    } = req.query;

    // Build query
    let query = {};

    if (category) {
      query.category = category;
    }

    if (dietary) {
      query.dietaryInfo = { $in: dietary.split(',') };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (isAvailable !== undefined) {
      query.isAvailable = isAvailable === 'true';
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const items = await MenuItem.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await MenuItem.countDocuments(query);

    res.json({
      success: true,
      data: {
        items,
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

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
exports.getMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    // Get reviews for this item
    const reviews = await Review.find({ menuItem: item._id, isPublished: true })
      .populate('user', 'name avatar')
      .sort('-createdAt')
      .limit(10);

    res.json({
      success: true,
      data: {
        item,
        reviews
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create menu item
// @route   POST /api/menu
// @access  Private/Admin
exports.createMenuItem = async (req, res) => {
  try {
    console.log('Create menu item - Request body:', req.body);
    console.log('Create menu item - User:', req.user?.email);
    
    const itemData = { ...req.body };

    // Handle image upload
    if (req.file) {
      itemData.image = `/uploads/menu/${req.file.filename}`;
    }

    const item = await MenuItem.create(itemData);
    console.log('Menu item created successfully:', item._id);

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: item
    });
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.toString()
    });
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
exports.updateMenuItem = async (req, res) => {
  try {
    console.log('Update menu item - ID:', req.params.id);
    console.log('Update menu item - Request body:', req.body);
    console.log('Update menu item - User:', req.user?.email);
    
    let item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    const updateData = { ...req.body };

    // Handle image upload
    if (req.file) {
      updateData.image = `/uploads/menu/${req.file.filename}`;
    }

    item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Menu item updated successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    await item.deleteOne();

    res.json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get menu categories
// @route   GET /api/menu/categories/list
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await MenuItem.distinct('category');
    
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await MenuItem.countDocuments({ 
          category, 
          isAvailable: true 
        });
        return { category, count };
      })
    );

    res.json({
      success: true,
      data: categoriesWithCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
