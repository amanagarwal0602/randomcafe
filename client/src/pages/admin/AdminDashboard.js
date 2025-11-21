import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiCalendar, FiUsers, FiDollarSign } from 'react-icons/fi';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/dashboard/stats');
      setStats(response.data.data.stats);
    } catch (error) {
      console.error('Failed to load stats');
    }
  };

  const statCards = [
    { icon: <FiDollarSign />, title: "Today's Revenue", value: `$${stats?.todayRevenue?.toFixed(2) || '0.00'}`, color: 'bg-green-500' },
    { icon: <FiShoppingBag />, title: 'Total Orders', value: stats?.totalOrders || 0, color: 'bg-blue-500' },
    { icon: <FiCalendar />, title: 'Today Reservations', value: stats?.todayReservations || 0, color: 'bg-purple-500' },
    { icon: <FiUsers />, title: 'Total Customers', value: stats?.totalUsers || 0, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brown-500 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-200">Manage your restaurant operations</p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Orders', path: '/admin/orders', color: 'bg-blue-500', desc: 'Manage customer orders' },
            { title: 'Reservations', path: '/admin/reservations', color: 'bg-purple-500', desc: 'Table bookings' },
            { title: 'Menu', path: '/admin/menu', color: 'bg-green-500', desc: 'Food & drinks' },
            { title: 'Gallery', path: '/admin/gallery', color: 'bg-yellow-500', desc: 'Photo management' },
            { title: 'Users', path: '/admin/users', color: 'bg-orange-500', desc: 'User accounts' },
            { title: 'Reviews', path: '/admin/reviews', color: 'bg-pink-500', desc: 'Customer feedback' },
            { title: 'Coupons', path: '/admin/coupons', color: 'bg-emerald-500', desc: 'Discount codes' },
          ].map((link, i) => (
            <Link key={i} to={link.path} className={`${link.color} text-white p-6 rounded-xl shadow-lg hover:opacity-90 transition`}>
              <h3 className="text-xl font-bold mb-1">{link.title}</h3>
              <p className="text-sm opacity-90">{link.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🎨 Website Content (CMS)</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Hero Section', path: '/admin/hero', color: 'bg-indigo-500', desc: 'Homepage banner' },
            { title: 'About Section', path: '/admin/about', color: 'bg-cyan-500', desc: 'Story & mission' },
            { title: 'Features', path: '/admin/features', color: 'bg-teal-500', desc: 'Service highlights' },
            { title: 'Team Members', path: '/admin/team', color: 'bg-rose-500', desc: 'Staff profiles' },
            { title: 'Contact Info', path: '/admin/contact-info', color: 'bg-amber-500', desc: 'Address & hours' },
            { title: 'Site Settings', path: '/admin/site-settings', color: 'bg-slate-500', desc: 'Branding & colors' },
            { title: 'SEO Settings', path: '/admin/seo', color: 'bg-violet-500', desc: 'Meta tags & keywords' },
          ].map((link, i) => (
            <Link key={i} to={link.path} className={`${link.color} text-white p-6 rounded-xl shadow-lg hover:opacity-90 transition`}>
              <h3 className="text-xl font-bold mb-1">{link.title}</h3>
              <p className="text-sm opacity-90">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
