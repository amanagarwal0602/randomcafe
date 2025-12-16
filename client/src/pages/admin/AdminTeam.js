import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';

const AdminTeam = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    image: '',
    email: '',
    phone: '',
    socialLinks: { facebook: '', instagram: '', twitter: '', linkedin: '' },
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await api.get('/team/all');
      setMembers(data);
    } catch (error) {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await api.put(`/team/${editingMember._id}`, formData);
        toast.success('Team member updated!');
      } else {
        await api.post('/team', formData);
        toast.success('Team member added!');
      }
      setShowModal(false);
      resetForm();
      fetchMembers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this team member?')) {
      try {
        await api.delete(`/team/${id}`);
        toast.success('Team member removed!');
        fetchMembers();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleToggleActive = async (member) => {
    try {
      await api.put(`/team/${member._id}`, {
        ...member,
        is_active: !member.is_active
      });
      toast.success(`Team member ${!member.is_active ? 'shown' : 'hidden'} on website`);
      fetchMembers();
    } catch (error) {
      toast.error('Failed to update visibility');
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio || '',
      image: member.image,
      email: member.email || '',
      phone: member.phone || '',
      socialLinks: member.socialLinks || { facebook: '', instagram: '', twitter: '', linkedin: '' },
      order: member.order,
      isActive: member.isActive
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      position: '',
      bio: '',
      image: '',
      email: '',
      phone: '',
      socialLinks: { facebook: '', instagram: '', twitter: '', linkedin: '' },
      order: 0,
      isActive: true
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Team Members</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your team</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Member
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map(member => (
            <div key={member._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <img 
                src={member.image} 
                alt={member.name} 
                loading="lazy"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-3">{member.position}</p>
              {member.bio && <p className="text-gray-600 dark:text-gray-400 text-xs mb-3">{member.bio.substring(0, 100)}...</p>}
              
              {/* Visibility Status Badge */}
              <div className="text-center mb-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  member.is_active 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  {member.is_active ? '👁️ Visible on Website' : '🚫 Hidden from Website'}
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                {/* Visibility Toggle Button */}
                <button
                  onClick={() => handleToggleActive(member)}
                  className={`px-3 py-2 text-sm rounded font-medium transition ${
                    member.is_active 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50'
                  }`}
                >
                  {member.is_active ? 'Hide from Website' : 'Show on Website'}
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingMember ? 'Edit Member' : 'Add Member'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['facebook', 'instagram', 'twitter', 'linkedin'].map(platform => (
                    <div key={platform}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">{platform}</label>
                      <input
                        type="url"
                        value={formData.socialLinks[platform]}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          socialLinks: { ...prev.socialLinks, [platform]: e.target.value }
                        }))}
                        className="w-full px-3 py-1.5 border rounded text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  {editingMember ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeam;

