import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [vegOnly, setVegOnly] = useState(false); // single veg-only toggle
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await api.get('/menu');
      const items = response.data.data?.items || response.data.data || response.data || [];
      setMenuItems(items);
    } catch (error) {
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/menu');
      const items = response.data.data?.items || response.data.data || response.data || [];
      const uniqueCategories = [...new Set(items.map(item => item.category))].filter(Boolean);
      setCategories(['all', ...uniqueCategories]);
    } catch (error) {
      console.error('Failed to load categories');
      setCategories(['all']);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  // Filter by search and category
  const getFilteredItems = () => {
    let filtered = menuItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Veg Only toggle
    if (vegOnly) {
      filtered = filtered.filter(item => item.is_veg === true || item.isVeg === true);
    }

    return filtered;
  };

  // Group items by category for "All" view
  const getGroupedItems = () => {
    const filtered = getFilteredItems();
    const grouped = {};
    
    filtered.forEach(item => {
      const category = item.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });
    
    return grouped;
  };

  const filteredItems = getFilteredItems();
  const groupedItems = selectedCategory === 'all' ? getGroupedItems() : null;

  const renderMenuItem = (item, index) => (
    <motion.div
      key={item.id || item._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card hover:shadow-xl transition-shadow"
    >
      <div className="h-48 overflow-hidden rounded-t-lg bg-gray-200">
        <img
          src={item.image || item.imageUrl || item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
          }}
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <span className="text-xs text-gray-500 uppercase">{item.category}</span>
          </div>
          <span className="text-xl font-bold text-primary-600">${parseFloat(item.price).toFixed(2)}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        
        {(item.is_veg || item.isVeg) && (
          <div className="flex gap-2 mb-4">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              🌱 Vegetarian
            </span>
          </div>
        )}
        
        {item.rating && (
          <div className="flex items-center gap-1 mb-3 text-sm text-gray-600">
            <span className="text-yellow-500">★</span>
            <span>{parseFloat(item.rating).toFixed(1)}</span>
            {item.rating_count && <span className="text-gray-400">({item.rating_count})</span>}
          </div>
        )}
        
        <button
          onClick={() => handleAddToCart(item)}
          disabled={item.is_available === false || item.isAvailable === false}
          className={`w-full btn-primary ${
            (item.is_available === false || item.isAvailable === false) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {(item.is_available !== false && item.isAvailable !== false) ? 'Add to Cart' : 'Not Available'}
        </button>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-brown-600 to-brown-500 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-serif font-bold mb-4">Our Menu</h1>
          <p className="text-xl text-gray-200">Discover our carefully curated selection</p>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Search, Category, Veg Only Toggle */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                }`}
              >
                {category === 'all' ? '🍽️ All Items' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={e => setVegOnly(e.target.checked)}
              className="form-checkbox h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <span className={`font-medium text-green-700 ${vegOnly ? 'font-bold' : ''}`}>Veg Only</span>
            {vegOnly && <span className="text-green-600 text-lg">🌱</span>}
          </label>
        </div>

        {/* Menu Display - Section-wise or Grid */}
        {selectedCategory === 'all' ? (
          // Section-wise display for "All"
          <div className="space-y-12">
            {Object.keys(groupedItems).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found</p>
              </div>
            ) : (
              Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-serif font-bold text-gray-800">{category}</h2>
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 text-sm">{items.length} items</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item, index) => renderMenuItem(item, index))}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          // Regular grid for specific category
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-serif font-bold text-gray-800">
                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </h2>
              <p className="text-gray-600">{filteredItems.length} items available</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => renderMenuItem(item, index))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
