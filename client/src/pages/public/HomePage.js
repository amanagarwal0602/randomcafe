import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCoffee, FiAward, FiHeart, FiArrowRight } from 'react-icons/fi';
import api from '../../services/api';

const HomePage = () => {
  const [hero, setHero] = useState(null);
  const [features, setFeatures] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const [heroRes, featuresRes, menuRes, reviewsRes] = await Promise.all([
        api.get('/hero'),
        api.get('/features/all'),
        api.get('/menu'),
        api.get('/reviews')
      ]);
      
      setHero(heroRes.data);
      setFeatures(featuresRes.data.filter(f => f.isActive).slice(0, 3));
      
      // Get top 3 menu items for "Customer Favorites"
      const items = menuRes.data.data?.items || menuRes.data.data || [];
      setMenuItems(items.slice(0, 3));
      
      // Get approved reviews
      const approvedReviews = (reviewsRes.data.data || []).filter(r => r.status === 'approved').slice(0, 3);
      setReviews(approvedReviews);
    } catch (error) {
      console.error('Error fetching homepage content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconEmoji) => {
    if (iconEmoji === '☕') return <FiCoffee className="w-12 h-12" />;
    if (iconEmoji === '🏆') return <FiAward className="w-12 h-12" />;
    if (iconEmoji === '❤️') return <FiHeart className="w-12 h-12" />;
    return <FiCoffee className="w-12 h-12" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section - DYNAMIC */}
      {hero && hero.isActive && (
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-brown-500 to-brown-600 text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${hero.backgroundImage || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200'})` }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-shadow-lg">
              {hero.title || 'Welcome to Lumière'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
              {hero.subtitle || 'Where every cup tells a story and every bite is a journey to culinary excellence'}
            </p>
            {hero.description && (
              <p className="text-lg mb-8 text-gray-200 max-w-xl mx-auto">
                {hero.description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {hero.primaryButtonText && (
                <Link to={hero.primaryButtonLink || '/menu'} className="btn-primary bg-primary-500 hover:bg-primary-600">
                  {hero.primaryButtonText}
                </Link>
              )}
              {hero.secondaryButtonText && (
                <Link to={hero.secondaryButtonLink || '/reservations'} className="btn-outline border-white text-white hover:bg-white hover:text-brown-500">
                  {hero.secondaryButtonText}
                </Link>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {/* Features Section - DYNAMIC */}
      {features.length > 0 && (
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
                  key={feature._id || feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="text-primary-500 mb-4 flex justify-center">
                    {getIcon(feature.icon)}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Items - DYNAMIC */}
      {menuItems.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold mb-4">Customer Favorites</h2>
              <p className="text-gray-600">Try our most loved items</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item._id || item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card group cursor-pointer hover:shadow-2xl transition-all"
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    {item.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary-600">₹{Math.round(parseFloat(item.price))}</span>
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
      )}

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

      {/* Reviews Section - DYNAMIC */}
      {reviews.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-4xl font-serif font-bold text-center mb-12">What Our Guests Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review._id || review.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-200 rounded-full mr-4 flex items-center justify-center text-primary-600 font-bold text-lg">
                      {review.userName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.userName || 'Customer'}</h4>
                      <div className="text-yellow-400">
                        {'★'.repeat(review.rating || 5)}{'☆'.repeat(5 - (review.rating || 5))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "{review.comment || review.review}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
