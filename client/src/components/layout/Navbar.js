import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdmin, isStaff } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Reserve', path: '/reservations' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl font-serif font-bold text-primary-500">Lumière</span>
            <span className="text-sm text-gray-600 hidden sm:block">CAFÉ</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary-500 transition-colors" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-500">
                  <FiUser className="w-6 h-6" />
                  <span className="hidden md:block">{user.name}</span>
                </button>
                
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-2">
                    {isStaff && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      to="/customer"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/customer/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/customer/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block btn-primary"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-700"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container-custom py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-primary-500"
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-primary-500 font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
