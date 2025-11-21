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
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, [selectedCategory]);

  const fetchMenuItems = async () => {
    try {
      const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
      const response = await api.get('/menu', { params });
      setMenuItems(response.data.data.items);
    } catch (error) {
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/menu/categories/list');
      setCategories(['all', ...response.data.data.map(c => c.category)]);
    } catch (error) {
      console.error('Failed to load categories');
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brown-500 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-serif font-bold mb-4">Our Menu</h1>
          <p className="text-xl text-gray-200">Discover our carefully curated selection</p>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 input-field"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card hover:shadow-xl transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image || 'https://via.placeholder.com/400x300'}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <span className="text-xl font-bold text-primary-600">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                {item.dietaryInfo && item.dietaryInfo.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {item.dietaryInfo.map(info => (
                      <span key={info} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {info}
                      </span>
                    ))}
                  </div>
                )}
                
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.isAvailable}
                  className={`w-full btn-primary ${
                    !item.isAvailable ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {item.isAvailable ? 'Add to Cart' : 'Not Available'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
