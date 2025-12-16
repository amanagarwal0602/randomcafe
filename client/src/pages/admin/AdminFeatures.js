import React, { useState, useEffect } from 'react';
import Alert from '../../components/common/Alert';
import api from '../../services/api';

const AdminFeatures = () => {
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [formData, setFormData] = useState({
    icon: '☕',
    title: '',
    description: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const { data } = await api.get('/features/all');
      setFeatures(data);
    } catch (error) {
      setError('Failed to load features');
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFeature) {
        await api.put(`/features/${editingFeature._id}`, formData);
        setSuccess('Feature updated!');
        setTimeout(() => setSuccess(''), 5000);
      } else {
        await api.post('/features', formData);
        setSuccess('Feature created!');
        setTimeout(() => setSuccess(''), 5000);
      }
      setShowModal(false);
      resetForm();
      fetchFeatures();
    } catch (error) {
      setError(error.response?.data?.message || 'Operation failed');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this feature?')) {
      try {
        await api.delete(`/features/${id}`);
        setSuccess('Feature deleted!');
        setTimeout(() => setSuccess(''), 5000);
        fetchFeatures();
      } catch (error) {
        setError('Failed to delete feature');
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  const handleEdit = (feature) => {
    setEditingFeature(feature);
    setFormData({
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
      order: feature.order,
      isActive: feature.isActive
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingFeature(null);
    setFormData({
      icon: '☕',
      title: '',
      description: '',
      order: 0,
      isActive: true
    });
  };

  const iconOptions = ['☕', '🍽️', '⭐', '🎨', '🌟', '💎', '🔥', '✨', '🎯', '🏆', '❤️', '🌿', '🍴', '🥐', '🍰'];

  return (
    <div className="max-w-6xl mx-auto">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Features</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage features displayed on your website</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Feature
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(feature => (
            <div key={feature._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-4xl">{feature.icon}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(feature)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(feature._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{feature.description}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Order: {feature.order}</span>
                <span className={feature.isActive ? 'text-green-600' : 'text-red-600'}>
                  {feature.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingFeature ? 'Edit Feature' : 'Add Feature'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Icon</label>
                <div className="grid grid-cols-5 gap-2">
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, icon }))}
                      className={`text-2xl p-2 border rounded ${formData.icon === icon ? 'border-blue-600 bg-blue-50' : 'border-gray-300 dark:border-gray-600'}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 text-blue-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Active</label>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingFeature ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeatures;

