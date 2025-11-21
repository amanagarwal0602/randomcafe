import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiUsers, FiHeart } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-brown-500 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-serif font-bold mb-4">About Lumière</h1>
          <p className="text-xl text-gray-200">Our story, passion, and commitment to excellence</p>
        </div>
      </div>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2015, Lumière Café was born from a simple vision: to create a space where exceptional coffee meets culinary artistry. Our journey began with a small roastery and a passion for bringing people together over great food and drink.
              </p>
              <p className="text-gray-700 mb-4">
                Today, we're proud to serve our community with ethically sourced, expertly crafted beverages and meals made from the finest local ingredients. Every cup, every plate tells a story of dedication, quality, and love for the craft.
              </p>
              <p className="text-gray-700">
                We believe in sustainability, supporting local farmers, and creating memorable experiences for every guest who walks through our doors.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-96 rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800"
                alt="Café interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <FiTarget />, title: 'Quality First', desc: 'We never compromise on the quality of our ingredients or service.' },
              { icon: <FiUsers />, title: 'Community', desc: 'Building connections and supporting local businesses is at our core.' },
              { icon: <FiHeart />, title: 'Passion', desc: 'Every dish and drink is crafted with genuine care and expertise.' }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="text-primary-500 text-5xl mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 mx-auto bg-primary-200 rounded-full mb-4"></div>
                <h3 className="font-semibold text-lg">Team Member</h3>
                <p className="text-gray-600">Head Chef</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
