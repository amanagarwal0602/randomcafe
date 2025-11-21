import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';

const AdminContactInfo = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    tagline: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    hours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: ''
    },
    mapEmbedUrl: ''
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data } = await api.get('/contact-info');
      setFormData(data);
    } catch (error) {
      toast.error('Failed to load contact info');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/contact-info', formData);
      toast.success('Contact information updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Contact Information</h1>
        <p className="text-gray-600 mt-2">Manage all contact details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Address</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={(e) => handleChange(e, 'address')}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={(e) => handleChange(e, 'address')}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.address.state}
                onChange={(e) => handleChange(e, 'address')}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.address.zipCode}
                onChange={(e) => handleChange(e, 'address')}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.address.country}
              onChange={(e) => handleChange(e, 'address')}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Hours</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
              <div key={day}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{day}</label>
                <input
                  type="text"
                  name={day}
                  value={formData.hours[day]}
                  onChange={(e) => handleChange(e, 'hours')}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="9:00 AM - 5:00 PM"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Social Media</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map(platform => (
              <div key={platform}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{platform}</label>
                <input
                  type="url"
                  name={platform}
                  value={formData.socialMedia[platform]}
                  onChange={(e) => handleChange(e, 'socialMedia')}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder={`https://${platform}.com/yourpage`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Map Embed */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Google Maps Embed</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Map Embed URL
              <span className="text-xs text-gray-500 ml-2">(From Google Maps Share → Embed)</span>
            </label>
            <input
              type="url"
              name="mapEmbedUrl"
              value={formData.mapEmbedUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminContactInfo;
