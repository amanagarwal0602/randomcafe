import React, { useState, useEffect } from 'react';
import Alert from '../../components/common/Alert';
import api from '../../services/api';

const AdminRoles = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [permissions, setPermissions] = useState({});

  // Define all available permissions
  const availablePermissions = {
    'Dashboard': [
      { id: 'view_dashboard', name: 'View Dashboard', description: 'Access admin dashboard' },
      { id: 'view_analytics', name: 'View Analytics', description: 'View sales and analytics reports' }
    ],
    'Orders': [
      { id: 'view_orders', name: 'View Orders', description: 'View customer orders' },
      { id: 'edit_orders', name: 'Edit Orders', description: 'Update order status' },
      { id: 'delete_orders', name: 'Delete Orders', description: 'Cancel/delete orders' }
    ],
    'Menu': [
      { id: 'view_menu', name: 'View Menu', description: 'View menu items' },
      { id: 'add_menu', name: 'Add Menu Items', description: 'Create new menu items' },
      { id: 'edit_menu', name: 'Edit Menu', description: 'Update menu items' },
      { id: 'delete_menu', name: 'Delete Menu', description: 'Remove menu items' },
      { id: 'toggle_availability', name: 'Toggle Availability', description: 'Enable/disable menu items' }
    ],
    'Reservations': [
      { id: 'view_reservations', name: 'View Reservations', description: 'View table bookings' },
      { id: 'edit_reservations', name: 'Edit Reservations', description: 'Update reservation status' },
      { id: 'delete_reservations', name: 'Delete Reservations', description: 'Cancel reservations' }
    ],
    'Gallery': [
      { id: 'view_gallery', name: 'View Gallery', description: 'View gallery images' },
      { id: 'add_gallery', name: 'Add Images', description: 'Upload new images' },
      { id: 'edit_gallery', name: 'Edit Gallery', description: 'Update image details' },
      { id: 'delete_gallery', name: 'Delete Images', description: 'Remove images' }
    ],
    'Users': [
      { id: 'view_users', name: 'View Users', description: 'View user list' },
      { id: 'edit_users', name: 'Edit Users', description: 'Update user details' },
      { id: 'delete_users', name: 'Delete Users', description: 'Remove users' },
      { id: 'manage_roles', name: 'Manage Roles', description: 'Assign roles and permissions' }
    ],
    'Coupons': [
      { id: 'view_coupons', name: 'View Coupons', description: 'View discount codes' },
      { id: 'add_coupons', name: 'Add Coupons', description: 'Create new coupons' },
      { id: 'edit_coupons', name: 'Edit Coupons', description: 'Update coupons' },
      { id: 'delete_coupons', name: 'Delete Coupons', description: 'Remove coupons' }
    ],
    'Reviews': [
      { id: 'view_reviews', name: 'View Reviews', description: 'View customer reviews' },
      { id: 'edit_reviews', name: 'Edit Reviews', description: 'Moderate reviews' },
      { id: 'delete_reviews', name: 'Delete Reviews', description: 'Remove reviews' }
    ],
    'CMS Content': [
      { id: 'view_cms', name: 'View CMS', description: 'View website content' },
      { id: 'edit_hero', name: 'Edit Hero Section', description: 'Update homepage banner' },
      { id: 'edit_about', name: 'Edit About', description: 'Update about section' },
      { id: 'edit_features', name: 'Edit Features', description: 'Manage features' },
      { id: 'edit_team', name: 'Edit Team', description: 'Manage team members' },
      { id: 'edit_contact', name: 'Edit Contact Info', description: 'Update contact details' },
      { id: 'edit_settings', name: 'Edit Site Settings', description: 'Manage site configuration' },
      { id: 'edit_seo', name: 'Edit SEO', description: 'Manage SEO settings' }
    ]
  };

  // Predefined role templates
  const roleTemplates = {
    admin: {
      name: 'Administrator',
      permissions: Object.values(availablePermissions).flat().map(p => p.id)
    },
    manager: {
      name: 'Manager',
      permissions: [
        'view_dashboard', 'view_analytics',
        'view_orders', 'edit_orders',
        'view_menu', 'edit_menu', 'toggle_availability',
        'view_reservations', 'edit_reservations',
        'view_users',
        'view_coupons', 'add_coupons', 'edit_coupons',
        'view_reviews', 'edit_reviews'
      ]
    },
    chef: {
      name: 'Chef',
      permissions: [
        'view_dashboard',
        'view_orders', 'edit_orders',
        'view_menu', 'add_menu', 'edit_menu', 'toggle_availability'
      ]
    },
    waiter: {
      name: 'Waiter',
      permissions: [
        'view_orders', 'edit_orders',
        'view_menu',
        'view_reservations', 'edit_reservations'
      ]
    },
    content_editor: {
      name: 'Content Editor',
      permissions: [
        'view_dashboard',
        'view_cms', 'edit_hero', 'edit_about', 'edit_features', 'edit_team',
        'view_gallery', 'add_gallery', 'edit_gallery',
        'view_menu', 'edit_menu'
      ]
    },
    viewer: {
      name: 'Viewer',
      permissions: [
        'view_dashboard',
        'view_orders',
        'view_menu',
        'view_reservations',
        'view_gallery',
        'view_users',
        'view_coupons',
        'view_reviews',
        'view_cms'
      ]
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data || []);
    } catch (error) {
      setError('Failed to load users');
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPermissions = (user) => {
    setSelectedUser(user);
    // Parse existing permissions
    const userPerms = {};
    const existingPerms = user.permissions ? 
      (typeof user.permissions === 'string' ? JSON.parse(user.permissions) : user.permissions) : [];
    
    existingPerms.forEach(perm => {
      userPerms[perm] = true;
    });
    setPermissions(userPerms);
    setShowModal(true);
  };

  const handlePermissionToggle = (permId) => {
    setPermissions(prev => ({
      ...prev,
      [permId]: !prev[permId]
    }));
  };

  const handleApplyTemplate = (templateKey) => {
    const template = roleTemplates[templateKey];
    const newPerms = {};
    template.permissions.forEach(perm => {
      newPerms[perm] = true;
    });
    setPermissions(newPerms);
  };

  const handleSavePermissions = async () => {
    try {
      const selectedPermissions = Object.keys(permissions).filter(key => permissions[key]);
      
      await api.put(`/users/${selectedUser.id}`, {
        permissions: JSON.stringify(selectedPermissions),
        role: selectedUser.role
      });

      setSuccess('Permissions updated successfully!');
      setTimeout(() => setSuccess(''), 5000);
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      setError('Failed to update permissions');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/users/${userId}`, { role: newRole });
      setSuccess('Role updated successfully!');
      setTimeout(() => setSuccess(''), 5000);
      fetchUsers();
    } catch (error) {
      setError('Failed to update role');
      setTimeout(() => setError(''), 5000);
    }
  };

  const getPermissionCount = (user) => {
    if (!user.permissions) return 0;
    const perms = typeof user.permissions === 'string' ? JSON.parse(user.permissions) : user.permissions;
    return Array.isArray(perms) ? perms.length : 0;
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Roles & Permissions</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage user access rights and assign specific permissions</p>
      </div>

      {/* Role Templates Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">Quick Role Templates:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-sm">
          {Object.entries(roleTemplates).map(([key, template]) => (
            <div key={key} className="bg-white dark:bg-gray-800 rounded px-3 py-2 border border-blue-300">
              <span className="font-medium text-blue-700">{template.name}</span>
              <span className="text-gray-500 ml-1">({template.permissions.length})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Users Table - Desktop */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permissions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 dark:text-gray-400 font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="px-3 py-1 border rounded text-sm"
                    disabled={user.role === 'admin' && user.email === 'admin@lumierecafe.com'}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="chef">Chef</option>
                    <option value="waiter">Waiter</option>
                    <option value="content_editor">Content Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {getPermissionCount(user)} permissions
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleEditPermissions(user)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Manage Permissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No users found
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center mb-3">
              <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3 flex-1">
                <div className="font-semibold text-gray-900 dark:text-gray-100">{user.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {user.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Role</label>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="w-full px-3 py-2 border rounded mt-1"
                  disabled={user.role === 'admin' && user.email === 'admin@lumierecafe.com'}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="chef">Chef</option>
                  <option value="waiter">Waiter</option>
                  <option value="content_editor">Content Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {getPermissionCount(user)} permissions
                  </span>
                </span>
                <button
                  onClick={() => handleEditPermissions(user)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No users found
          </div>
        )}
      </div>

      {/* Edit Permissions Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b p-6 z-10">
              <h2 className="text-2xl font-bold">
                Manage Permissions: {selectedUser.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{selectedUser.email}</p>
              
              {/* Role Templates */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Apply Role Template:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(roleTemplates).map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => handleApplyTemplate(key)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Permissions by Category */}
              {Object.entries(availablePermissions).map(([category, perms]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {perms.map((perm) => (
                      <label
                        key={perm.id}
                        className="flex items-start p-3 border rounded-lg hover:bg-gray-50 dark:bg-gray-800 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={permissions[perm.id] || false}
                          onChange={() => handlePermissionToggle(perm.id)}
                          className="mt-1 mr-3 flex-shrink-0 h-4 w-4"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{perm.name}</div>
                          <div className="text-sm text-gray-500">{perm.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 py-4 border-t flex flex-col sm:flex-row gap-2 sm:justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-gray-100 order-2 sm:order-1"
              >
                Cancel
              </button>
              <div className="flex flex-col sm:flex-row gap-2 order-1 sm:order-2">
                <button
                  onClick={() => setPermissions({})}
                  className="w-full sm:w-auto px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  Clear All
                </button>
                <button
                  onClick={() => handleApplyTemplate('admin')}
                  className="w-full sm:w-auto px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                >
                  Select All
                </button>
                <button
                  onClick={handleSavePermissions}
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Save Permissions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoles;

