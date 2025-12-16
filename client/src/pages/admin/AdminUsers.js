import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Available permissions
  const availablePermissions = [
    { key: 'view_dashboard', label: 'View Dashboard', category: 'Dashboard' },
    { key: 'view_orders', label: 'View Orders', category: 'Orders' },
    { key: 'edit_orders', label: 'Edit Orders', category: 'Orders' },
    { key: 'delete_orders', label: 'Delete Orders', category: 'Orders' },
    { key: 'view_menu', label: 'View Menu', category: 'Menu' },
    { key: 'add_menu', label: 'Add Menu Items', category: 'Menu' },
    { key: 'edit_menu', label: 'Edit Menu Items', category: 'Menu' },
    { key: 'delete_menu', label: 'Delete Menu Items', category: 'Menu' },
    { key: 'view_reservations', label: 'View Reservations', category: 'Reservations' },
    { key: 'edit_reservations', label: 'Edit Reservations', category: 'Reservations' },
    { key: 'delete_reservations', label: 'Delete Reservations', category: 'Reservations' },
    { key: 'view_gallery', label: 'View Gallery', category: 'Gallery' },
    { key: 'add_gallery', label: 'Add Gallery Items', category: 'Gallery' },
    { key: 'view_reviews', label: 'View Reviews', category: 'Reviews' },
    { key: 'edit_reviews', label: 'Edit Reviews', category: 'Reviews' },
    { key: 'view_users', label: 'View Users', category: 'Users' },
    { key: 'edit_users', label: 'Edit Users', category: 'Users' },
    { key: 'view_coupons', label: 'View Coupons', category: 'Coupons' },
    { key: 'add_coupons', label: 'Add Coupons', category: 'Coupons' },
    { key: 'edit_coupons', label: 'Edit Coupons', category: 'Coupons' },
  ];

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to load users');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data.data || response.data || []);
    } catch (error) {
      console.error('Failed to load orders');
    }
  };

  // Calculate total order value for each user
  const getUserOrderValue = (userId) => {
    return orders
      .filter(order => order.user_id === userId || order.userId === userId)
      .filter(order => order.status !== 'cancelled')
      .reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0);
  };

  // Filter and sort users
  const getFilteredAndSortedUsers = () => {
    let filtered = users;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'totalOrders':
          return getUserOrderValue(b.id) - getUserOrderValue(a.id);
        default:
          return 0;
      }
    });

    return sorted;
  };

  const filteredUsers = getFilteredAndSortedUsers();

  const toggleActive = async (userId) => {
    try {
      const user = users.find(u => u.id === userId);
      await api.put(`/users/${userId}`, { is_active: !user.is_active });
      toast.success('User status updated');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  const openPasswordModal = (user) => {
    setSelectedUser(user);
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordModal(true);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Use plain text password for simplicity
      await api.put(`/users/${selectedUser.id}`, { password: newPassword });
      toast.success('Password updated successfully');
      setShowPasswordModal(false);
      setSelectedUser(null);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  const openPermissionsModal = (user) => {
    setSelectedUser(user);
    setShowPermissionsModal(true);
  };

  const togglePermission = (permissionKey) => {
    if (!selectedUser) return;
    
    const currentPerms = Array.isArray(selectedUser.permissions) 
      ? selectedUser.permissions 
      : (typeof selectedUser.permissions === 'string' ? JSON.parse(selectedUser.permissions) : []);
    
    const hasPermission = currentPerms.includes(permissionKey);
    const newPermissions = hasPermission
      ? currentPerms.filter(p => p !== permissionKey)
      : [...currentPerms, permissionKey];
    
    setSelectedUser({
      ...selectedUser,
      permissions: newPermissions
    });
  };

  const savePermissions = async () => {
    try {
      await api.put(`/users/${selectedUser.id}`, { 
        permissions: selectedUser.permissions 
      });
      toast.success('Permissions updated successfully');
      setShowPermissionsModal(false);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update permissions');
    }
  };

  const getUserPermissions = (user) => {
    if (user.role === 'admin') return ['all'];
    if (!user.permissions) return [];
    return Array.isArray(user.permissions) 
      ? user.permissions 
      : (typeof user.permissions === 'string' ? JSON.parse(user.permissions) : []);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 dark:bg-gray-900 py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-serif font-bold mb-8">User Management</h1>
        
        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search by Name or Email
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Role
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="chef">Chef</option>
                <option value="waiter">Waiter</option>
                <option value="customer">Customer</option>
                <option value="content_editor">Content Editor</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="name">Name (A-Z)</option>
                <option value="email">Email (A-Z)</option>
                <option value="role">Role (A-Z)</option>
                <option value="totalOrders">Total Order Value (High to Low)</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Password</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Total Orders</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Order Value</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map(user => {
                const userOrders = orders.filter(o => (o.user_id === user.id || o.userId === user.id) && o.status !== 'cancelled');
                const orderValue = getUserOrderValue(user.id);
                
                return (
                  <tr key={user.id}>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm font-mono">
                        {user.password || '••••••••'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">{userOrders.length}</td>
                    <td className="px-6 py-4 font-semibold text-green-600">
                      ₹{Math.round(orderValue)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-sm ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button 
                        onClick={() => openPermissionsModal(user)} 
                        className="text-purple-600 hover:underline"
                        title={`${getUserPermissions(user).length} permissions`}
                      >
                        Permissions ({getUserPermissions(user).length})
                      </button>
                      <button 
                        onClick={() => toggleActive(user.id)} 
                        className="text-blue-600 hover:underline"
                      >
                        Toggle Status
                      </button>
                      <button 
                        onClick={() => openPasswordModal(user)} 
                        className="text-green-600 hover:underline"
                      >
                        Reset Password
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Password Update Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Reset Password for {selectedUser?.name}</h2>
            <form onSubmit={handlePasswordUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter new password"
                  required
                  minLength={6}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setSelectedUser(null);
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {showPermissionsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Manage Permissions for {selectedUser?.name}</h2>
            
            {selectedUser.role === 'admin' ? (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  🔐 Admin users have full access to all features
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Select which admin features this user can access. Selected permissions will appear in their dashboard.
                </p>
                
                <div className="space-y-6">
                  {Object.entries(
                    availablePermissions.reduce((acc, perm) => {
                      if (!acc[perm.category]) acc[perm.category] = [];
                      acc[perm.category].push(perm);
                      return acc;
                    }, {})
                  ).map(([category, perms]) => (
                    <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {perms.map(perm => {
                          const userPerms = getUserPermissions(selectedUser);
                          const isChecked = userPerms.includes(perm.key);
                          
                          return (
                            <label 
                              key={perm.key} 
                              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => togglePermission(perm.key)}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{perm.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPermissionsModal(false);
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={savePermissions}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Permissions
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;

