import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCoffee, FiAward, FiHeart, FiArrowRight } from 'react-icons/fi';

const HomePage = () => {
  const features = [
    {
      icon: <FiCoffee className="w-12 h-12" />,
      title: 'Artisan Coffee',
      description: 'Premium beans sourced from sustainable farms, expertly roasted for perfect flavor.'
    },
    {
      icon: <FiAward className="w-12 h-12" />,
      title: 'Award Winning',
      description: 'Recognized for excellence in culinary arts and exceptional customer service.'
    },
    {
      icon: <FiHeart className="w-12 h-12" />,
      title: 'Made with Love',
      description: 'Every dish crafted with passion using fresh, locally-sourced ingredients.'
    }
  ];

  const popularItems = [
    { name: 'Signature Espresso', price: 4.50, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400' },
    { name: 'French Croissant', price: 5.00, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
    { name: 'Avocado Toast', price: 12.00, image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-brown-500 to-brown-600 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200)' }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-shadow-lg">
            Welcome to Lumière
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Where every cup tells a story and every bite is a journey to culinary excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu" className="btn-primary bg-primary-500 hover:bg-primary-600">
              Explore Menu
            </Link>
            <Link to="/reservations" className="btn-outline border-white text-white hover:bg-white hover:text-brown-500">
              Reserve a Table
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold mb-4">Why Choose Lumière</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of tradition and innovation in every aspect of our service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-primary-500 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Customer Favorites</h2>
            <p className="text-gray-600">Try our most loved items</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group cursor-pointer hover:shadow-2xl transition-all"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary-600">${item.price.toFixed(2)}</span>
                    <button className="text-primary-500 hover:text-primary-600">
                      <FiArrowRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu" className="btn-primary">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brown-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Experience Lumière?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience. Reserve your table today!
          </p>
          <Link to="/reservations" className="btn-primary bg-primary-500 hover:bg-primary-600">
            Make a Reservation
          </Link>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">What Our Guests Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Customer Name</h4>
                    <div className="text-yellow-400">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Amazing atmosphere and incredible food. The coffee is the best I've ever had! Highly recommend the brunch menu."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
