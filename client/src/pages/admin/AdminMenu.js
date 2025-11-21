import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    isAvailable: true
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name,
        description: editItem.description,
        price: editItem.price,
        category: editItem.category,
        image: editItem.image,
        isAvailable: editItem.isAvailable
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: categories.length > 0 ? categories[0] : '',
        image: '',
        isAvailable: true
      });
    }
    setShowNewCategory(false);
    setNewCategoryName('');
  }, [editItem, categories]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/menu');
      console.log('Menu API Response:', response.data);
      if (response.data && response.data.data && response.data.data.items) {
        const items = response.data.data.items;
        setMenuItems(items);
        
        // Extract unique categories from menu items
        const uniqueCategories = [...new Set(items.map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories.sort());
      } else {
        console.error('Unexpected response structure:', response.data);
        setMenuItems([]);
        setCategories([]);
      }
    } catch (error) {
      console.error('Failed to load menu items:', error);
      toast.error(error.response?.data?.message || 'Failed to load menu items');
      setMenuItems([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If creating new category, add it to the formData
    const submitData = { ...formData };
    if (showNewCategory && newCategoryName.trim()) {
      submitData.category = newCategoryName.trim();
    }
    
    try {
      console.log('Submitting form data:', submitData);
      console.log('Auth token:', localStorage.getItem('accessToken') ? 'Present' : 'Missing');
      
      if (editItem) {
        const response = await api.put(`/menu/${editItem._id}`, submitData);
        console.log('Update response:', response.data);
        toast.success('Menu item updated successfully');
      } else {
        const response = await api.post('/menu', submitData);
        console.log('Create response:', response.data);
        toast.success('Menu item added successfully');
      }
      setShowModal(false);
      setEditItem(null);
      setShowNewCategory(false);
      setNewCategoryName('');
      fetchMenuItems();
    } catch (error) {
      console.error('Save error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      
      let errorMsg = 'Failed to save menu item';
      
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        // Show all validation errors
        errorMsg = error.response.data.errors.map(err => `${err.field}: ${err.message}`).join(', ');
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMsg = 'Not authorized. Please login again.';
      } else if (error.response?.status === 403) {
        errorMsg = 'You do not have permission to perform this action.';
      }
      
      toast.error(errorMsg);
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await api.delete(`/menu/${id}`);
        toast.success('Item deleted successfully');
        fetchMenuItems();
      } catch (error) {
        toast.error('Failed to delete item');
      }
    }
  };

  const toggleAvailability = async (item) => {
    try {
      await api.put(`/menu/${item._id}`, { isAvailable: !item.isAvailable });
      toast.success('Availability updated');
      fetchMenuItems();
    } catch (error) {
      toast.error('Failed to update availability');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold">Menu Management</h1>
            <p className="text-gray-600 mt-2">{menuItems.length} items in menu</p>
          </div>
          <button onClick={() => { setEditItem(null); setShowModal(true); }} className="btn-primary flex items-center gap-2">
            <FiPlus /> Add New Item
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading menu items...</p>
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-600 text-lg mb-4">No menu items found</p>
            <p className="text-gray-500">Click "Add New Item" to create your first menu item</p>
          </div>
        ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="relative">
                <img src={item.image || 'https://via.placeholder.com/400'} alt={item.name} className="w-full h-48 object-cover" />
                <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${item.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded">{item.category}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                <p className="text-primary-600 font-bold text-xl mb-4">${item.price.toFixed(2)}</p>
                <div className="flex gap-2">
                  <button onClick={() => toggleAvailability(item)} className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm">
                    Toggle
                  </button>
                  <button onClick={() => { setEditItem(item); setShowModal(true); }} className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                    <FiEdit2 className="inline mr-1" /> Edit
                  </button>
                  <button onClick={() => deleteItem(item._id)} className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                    <FiTrash2 className="inline mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold">{editItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
                <button onClick={() => { setShowModal(false); setEditItem(null); }} className="text-gray-500 hover:text-gray-700">
                  <FiX size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Item Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="input-field"
                    rows="3"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    {!showNewCategory ? (
                      <div className="space-y-2">
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="input-field"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => setShowNewCategory(true)}
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          + Create New Category
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          className="input-field"
                          placeholder="Enter new category name"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setShowNewCategory(false);
                            setNewCategoryName('');
                          }}
                          className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                        >
                          ← Use Existing Category
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL *</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isAvailable"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <label htmlFor="isAvailable" className="text-sm font-medium">Available for order</label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => { setShowModal(false); setEditItem(null); }} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    {editItem ? 'Update Item' : 'Add Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
