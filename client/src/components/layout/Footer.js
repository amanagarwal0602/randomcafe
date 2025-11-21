import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brown-500 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Lumière Café</h3>
            <p className="text-gray-200 mb-4">
              Experience the perfect blend of artisan coffee, fresh pastries, and warm hospitality in an elegant atmosphere.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-300">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-300">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-300">
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/menu" className="text-gray-200 hover:text-primary-300">Menu</Link></li>
              <li><Link to="/about" className="text-gray-200 hover:text-primary-300">About Us</Link></li>
              <li><Link to="/gallery" className="text-gray-200 hover:text-primary-300">Gallery</Link></li>
              <li><Link to="/reservations" className="text-gray-200 hover:text-primary-300">Reservations</Link></li>
              <li><Link to="/contact" className="text-gray-200 hover:text-primary-300">Contact</Link></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-gray-200">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>7AM - 10PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>8AM - 11PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>8AM - 9PM</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start space-x-2">
                <FiMapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>123 Artisan Street, Downtown District, NY 10001</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="w-5 h-5 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="w-5 h-5 flex-shrink-0" />
                <span>hello@lumierecafe.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-400 mt-8 pt-8 text-center text-gray-200">
          <p>&copy; {currentYear} Lumière Café. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Crafted with passion and attention to detail.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
