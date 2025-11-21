import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <div className="bg-brown-500 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-xl">We'd love to hear from you</p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="input-field"
                required
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="input-field"
                rows="5"
                required
              />
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold mb-6">Visit Us</h2>
            <div className="flex items-start space-x-4">
              <FiMapPin className="w-6 h-6 text-primary-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-gray-600">123 Artisan Street<br />Downtown District, NY 10001</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FiPhone className="w-6 h-6 text-primary-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">(555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FiMail className="w-6 h-6 text-primary-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-600">hello@lumierecafe.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FiClock className="w-6 h-6 text-primary-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Hours</h3>
                <p className="text-gray-600">
                  Mon-Fri: 7AM - 10PM<br />
                  Sat: 8AM - 11PM<br />
                  Sun: 8AM - 9PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
