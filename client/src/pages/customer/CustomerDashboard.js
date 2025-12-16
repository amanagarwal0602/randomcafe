import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiCalendar, FiUser, FiSettings, FiBox, FiImage, FiStar, FiUsers, FiTag } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { checkPermission } from '../../utils/permissions';

const CustomerDashboard = () => {
  const { user } = useAuth();

  const customerLinks = [
    { icon: <FiUser />, title: 'My Profile', path: '/customer/profile', color: 'bg-blue-500' },
    { icon: <FiShoppingBag />, title: 'My Orders', path: '/customer/orders', color: 'bg-green-500' },
    { icon: <FiCalendar />, title: 'Reservations', path: '/customer/reservations', color: 'bg-purple-500' },
    { icon: <FiHeart />, title: 'Favorites', path: '/customer/favorites', color: 'bg-red-500' },
  ];

  // Admin menu items based on permissions
  const adminLinks = [
    { icon: <FiSettings />, title: 'Admin Dashboard', path: '/admin', color: 'bg-indigo-500', permission: 'view_dashboard' },
    { icon: <FiShoppingBag />, title: 'Manage Orders', path: '/admin/orders', color: 'bg-orange-500', permission: 'view_orders' },
    { icon: <FiBox />, title: 'Menu Management', path: '/admin/menu', color: 'bg-teal-500', permission: 'view_menu' },
    { icon: <FiCalendar />, title: 'Reservations', path: '/admin/reservations', color: 'bg-cyan-500', permission: 'view_reservations' },
    { icon: <FiImage />, title: 'Gallery', path: '/admin/gallery', color: 'bg-pink-500', permission: 'view_gallery' },
    { icon: <FiStar />, title: 'Reviews', path: '/admin/reviews', color: 'bg-yellow-500', permission: 'view_reviews' },
    { icon: <FiUsers />, title: 'Users', path: '/admin/users', color: 'bg-violet-500', permission: 'view_users' },
    { icon: <FiTag />, title: 'Coupons', path: '/admin/coupons', color: 'bg-emerald-500', permission: 'view_coupons' },
  ];

  // Filter admin links based on user permissions
  const availableAdminLinks = adminLinks.filter(link => 
    checkPermission(user, link.permission)
  );

  const quickLinks = [...customerLinks, ...availableAdminLinks];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-brown-500 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-200">
            {availableAdminLinks.length > 0 
              ? `Manage your account and ${user?.role === 'admin' ? 'admin' : 'assigned'} features`
              : 'Manage your account and orders'
            }
          </p>
          {availableAdminLinks.length > 0 && (
            <div className="mt-3 inline-block bg-white/20 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">✨ You have access to {availableAdminLinks.length} admin feature{availableAdminLinks.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition group"
            >
              <div className={`${link.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition`}>
                {link.icon}
              </div>
              <h3 className="font-semibold text-lg">{link.title}</h3>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-serif font-bold mb-4">Recent Orders</h2>
            <p className="text-gray-600 dark:text-gray-400">You have no recent orders</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-serif font-bold mb-4">Upcoming Reservations</h2>
            <p className="text-gray-600 dark:text-gray-400">No upcoming reservations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

