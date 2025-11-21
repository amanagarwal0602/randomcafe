import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';

const AdminSEO = () => {
  const [page, setPage] = useState('home');
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: []
  });

  const handleSave = async () => {
    try {
      await api.put(`/seo/${page}`, seoData);
      toast.success('SEO settings updated');
    } catch (error) {
      toast.error('Failed to update SEO settings');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-8">SEO Management</h1>
        <div className="bg-white p-8 rounded-xl shadow">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Page</label>
            <select value={page} onChange={(e) => setPage(e.target.value)} className="input-field">
              <option value="home">Home</option>
              <option value="menu">Menu</option>
              <option value="about">About</option>
              <option value="gallery">Gallery</option>
              <option value="contact">Contact</option>
              <option value="reservations">Reservations</option>
            </select>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title (Max 60 chars)</label>
              <input
                type="text"
                value={seoData.title}
                onChange={(e) => setSeoData({...seoData, title: e.target.value})}
                maxLength={60}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description (Max 160 chars)</label>
              <textarea
                value={seoData.description}
                onChange={(e) => setSeoData({...seoData, description: e.target.value})}
                maxLength={160}
                className="input-field"
                rows="3"
              />
            </div>
            <button onClick={handleSave} className="btn-primary">Save SEO Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSEO;
