import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiCalendar, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const CustomerDashboard = () => {
  const { user } = useAuth();

  const quickLinks = [
    { icon: <FiUser />, title: 'My Profile', path: '/customer/profile', color: 'bg-blue-500' },
    { icon: <FiShoppingBag />, title: 'My Orders', path: '/customer/orders', color: 'bg-green-500' },
    { icon: <FiCalendar />, title: 'Reservations', path: '/customer/reservations', color: 'bg-purple-500' },
    { icon: <FiHeart />, title: 'Favorites', path: '/customer/favorites', color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brown-500 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-200">Manage your account and orders</p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition group"
            >
              <div className={`${link.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition`}>
                {link.icon}
              </div>
              <h3 className="font-semibold text-lg">{link.title}</h3>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-serif font-bold mb-4">Recent Orders</h2>
            <p className="text-gray-600">You have no recent orders</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-serif font-bold mb-4">Upcoming Reservations</h2>
            <p className="text-gray-600">No upcoming reservations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
