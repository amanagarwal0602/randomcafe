import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';

const AdminSiteSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    siteName: '',
    logo: '',
    favicon: '',
    primaryColor: '',
    secondaryColor: '',
    accentColor: '',
    footerText: '',
    announcementBar: {
      enabled: false,
      message: '',
      backgroundColor: '',
      textColor: ''
    },
    maintenanceMode: {
      enabled: false,
      message: ''
    },
    googleAnalyticsId: '',
    facebookPixelId: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await api.get('/site-settings');
      console.log('Site settings data:', data);
      setFormData({
        siteName: data.siteName || 'Lumiere Cafe',
        logo: data.logo || '',
        favicon: data.favicon || '',
        primaryColor: data.primaryColor || '#3b82f6',
        secondaryColor: data.secondaryColor || '#8b5cf6',
        accentColor: data.accentColor || '#ec4899',
        footerText: data.footerText || '© 2024 Lumiere Cafe. All rights reserved.',
        announcementBar: data.announcementBar || {
          enabled: false,
          message: '',
          backgroundColor: '#3b82f6',
          textColor: '#ffffff'
        },
        maintenanceMode: data.maintenanceMode || {
          enabled: false,
          message: 'We are currently under maintenance. Please check back soon.'
        },
        googleAnalyticsId: data.googleAnalyticsId || '',
        facebookPixelId: data.facebookPixelId || ''
      });
    } catch (error) {
      console.error('Settings error:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/site-settings', formData);
      toast.success('Settings updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e, section = null, field = null) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [name]: val }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: val }));
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Site Settings</h1>
        <p className="text-gray-600 mt-2">Configure your website settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Settings */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Settings</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site Name *</label>
            <input
              type="text"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
              <input
                type="url"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Favicon URL</label>
              <input
                type="url"
                name="favicon"
                value={formData.favicon}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Footer Text</label>
            <input
              type="text"
              name="footerText"
              value={formData.footerText}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Brand Colors */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Brand Colors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="h-10 w-20 border rounded"
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="secondaryColor"
                  value={formData.secondaryColor}
                  onChange={handleChange}
                  className="h-10 w-20 border rounded"
                />
                <input
                  type="text"
                  value={formData.secondaryColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="accentColor"
                  value={formData.accentColor}
                  onChange={handleChange}
                  className="h-10 w-20 border rounded"
                />
                <input
                  type="text"
                  value={formData.accentColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, accentColor: e.target.value }))}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Announcement Bar</h2>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="enabled"
                checked={formData.announcementBar.enabled}
                onChange={(e) => handleChange(e, 'announcementBar')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">Enable</span>
            </label>
          </div>

          {formData.announcementBar.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <input
                  type="text"
                  name="message"
                  value={formData.announcementBar.message}
                  onChange={(e) => handleChange(e, 'announcementBar')}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                  <input
                    type="color"
                    name="backgroundColor"
                    value={formData.announcementBar.backgroundColor}
                    onChange={(e) => handleChange(e, 'announcementBar')}
                    className="h-10 w-full border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                  <input
                    type="color"
                    name="textColor"
                    value={formData.announcementBar.textColor}
                    onChange={(e) => handleChange(e, 'announcementBar')}
                    className="h-10 w-full border rounded"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Maintenance Mode */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Maintenance Mode</h2>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="enabled"
                checked={formData.maintenanceMode.enabled}
                onChange={(e) => handleChange(e, 'maintenanceMode')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">Enable</span>
            </label>
          </div>

          {formData.maintenanceMode.enabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.maintenanceMode.message}
                onChange={(e) => handleChange(e, 'maintenanceMode')}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics & Tracking</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
            <input
              type="text"
              name="googleAnalyticsId"
              value={formData.googleAnalyticsId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="G-XXXXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
            <input
              type="text"
              name="facebookPixelId"
              value={formData.facebookPixelId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="123456789012345"
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

export default AdminSiteSettings;
