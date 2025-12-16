require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const Gallery = require('../models/Gallery');
const SEO = require('../models/SEO');
const HeroSection = require('../models/HeroSection');
const AboutSection = require('../models/AboutSection');
const Feature = require('../models/Feature');
const TeamMember = require('../models/TeamMember');
const ContactInfo = require('../models/ContactInfo');
const SiteSettings = require('../models/SiteSettings');
const Coupon = require('../models/Coupon');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await MenuItem.deleteMany({});
    await Gallery.deleteMany({});
    await SEO.deleteMany({});
    await HeroSection.deleteMany({});
    await AboutSection.deleteMany({});
    await Feature.deleteMany({});
    await TeamMember.deleteMany({});
    await ContactInfo.deleteMany({});
    await SiteSettings.deleteMany({});
    await Coupon.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@lumierecafe.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });
    console.log('Created admin user: admin@lumierecafe.com / Admin@123');

    // Create menu items
    const menuItems = [
      { name: 'Espresso', description: 'Rich and bold Italian espresso', price: 3.50, category: 'drinks', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400', isAvailable: true },
      { name: 'Cappuccino', description: 'Espresso with steamed milk foam', price: 4.50, category: 'drinks', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', isAvailable: true },
      { name: 'Croissant', description: 'Buttery French pastry', price: 3.00, category: 'breakfast', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', isAvailable: true },
      { name: 'Avocado Toast', description: 'Sourdough with fresh avocado', price: 8.50, category: 'breakfast', dietary: ['vegetarian'], image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400', isAvailable: true },
      { name: 'Caesar Salad', description: 'Crispy romaine with parmesan', price: 12.00, category: 'lunch', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', isAvailable: true },
      { name: 'Grilled Salmon', description: 'Fresh Atlantic salmon with vegetables', price: 18.00, category: 'dinner', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400', isAvailable: true },
      { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center', price: 7.50, category: 'desserts', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400', isAvailable: true },
      { name: 'Tiramisu', description: 'Classic Italian dessert', price: 6.50, category: 'desserts', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', isAvailable: true },
    ];
    await MenuItem.insertMany(menuItems);
    console.log('Created menu items');

    // Create gallery images
    const galleryImages = [
      { title: 'Café Interior', description: 'Modern and cozy atmosphere', category: 'interior', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800', isPublished: true, order: 1 },
      { title: 'Signature Coffee', description: 'Our specialty blend', category: 'food', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800', isPublished: true, order: 2 },
      { title: 'Team Event', description: 'Celebrating our anniversary', category: 'events', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800', isPublished: true, order: 3 },
    ];
    await Gallery.insertMany(galleryImages);
    console.log('Created gallery images');

    // Create SEO settings
    const seoPages = [
      { page: 'home', title: 'Lumière Café - Premium Coffee & Dining', description: 'Experience artisan coffee and exceptional cuisine in a warm, inviting atmosphere. Award-winning café serving breakfast, lunch, and dinner.', keywords: ['café', 'coffee', 'restaurant', 'dining'] },
      { page: 'menu', title: 'Our Menu - Lumière Café', description: 'Browse our selection of artisan coffee, fresh pastries, gourmet meals, and delicious desserts. Something special for every taste.', keywords: ['menu', 'food', 'coffee', 'breakfast'] },
      { page: 'about', title: 'About Us - Lumière Café', description: 'Learn about our story, values, and the passionate team behind Lumière Café. Quality ingredients, exceptional service since 2020.', keywords: ['about', 'café', 'team', 'story'] },
      { page: 'gallery', title: 'Gallery - Lumière Café', description: 'Explore photos of our café interior, signature dishes, and special events. See what makes Lumière Café special.', keywords: ['gallery', 'photos', 'interior'] },
      { page: 'contact', title: 'Contact Us - Lumière Café', description: 'Get in touch with Lumière Café. Visit us, call, or send a message. We\'d love to hear from you.', keywords: ['contact', 'location', 'hours'] },
      { page: 'reservations', title: 'Reservations - Lumière Café', description: 'Book your table at Lumière Café. Easy online reservations for breakfast, lunch, or dinner. Special occasions welcome.', keywords: ['reservations', 'booking', 'table'] },
    ];
    await SEO.insertMany(seoPages);
    console.log('Created SEO settings');

    // Create CMS content - empty, will be populated from sampleDataFull.json or admin panel
    // Hero and About sections will be created when admin adds content
    console.log('CMS content structure ready (will be populated from sample data)');

    const features = [
      { icon: '☕', title: 'Premium Coffee', description: 'Artisan coffee beans sourced from the finest farms worldwide', order: 1, isActive: true },
      { icon: '🍽️', title: 'Gourmet Cuisine', description: 'Fresh ingredients prepared by expert chefs daily', order: 2, isActive: true },
      { icon: '⭐', title: 'Exceptional Service', description: 'Warm hospitality and attention to every detail', order: 3, isActive: true },
      { icon: '🎨', title: 'Cozy Atmosphere', description: 'Modern design with a welcoming, comfortable vibe', order: 4, isActive: true },
    ];
    await Feature.insertMany(features);
    console.log('Created features');

    const teamMembers = [
      { name: 'Sarah Johnson', position: 'Head Chef', bio: 'Culinary expert with 15 years of experience', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', order: 1, isActive: true },
      { name: 'Michael Chen', position: 'Barista Master', bio: 'Award-winning coffee specialist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', order: 2, isActive: true },
      { name: 'Emma Davis', position: 'Manager', bio: 'Passionate about creating memorable experiences', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', order: 3, isActive: true },
    ];
    await TeamMember.insertMany(teamMembers);
    console.log('Created team members');

    // Contact Info and Site Settings will be created when admin configures them
    console.log('Contact Info and Site Settings ready for admin configuration');

    // Create sample coupons
    const coupons = [
      {
        code: 'WELCOME10',
        description: 'Welcome discount - 10% off your first order',
        discountType: 'percentage',
        discountValue: 10,
        minOrderAmount: 20,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        usageLimit: 100,
        isActive: true,
        createdBy: admin._id
      },
      {
        code: 'SAVE20',
        description: 'Save $20 on orders above $100',
        discountType: 'fixed',
        discountValue: 20,
        minOrderAmount: 100,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
        isActive: true,
        createdBy: admin._id
      },
      {
        code: 'SUMMER25',
        description: 'Summer special - 25% off (max $50 discount)',
        discountType: 'percentage',
        discountValue: 25,
        minOrderAmount: 50,
        maxDiscountAmount: 50,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        usageLimit: 50,
        isActive: true,
        createdBy: admin._id
      },
      {
        code: 'FREESHIP',
        description: 'Free shipping - $5 off delivery fee',
        discountType: 'fixed',
        discountValue: 5,
        minOrderAmount: 30,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days
        isActive: true,
        createdBy: admin._id
      }
    ];
    await Coupon.insertMany(coupons);
    console.log('Created sample coupons');

    console.log('\n✅ Database seeded successfully!');
    console.log('Admin credentials: admin@lumierecafe.com / Admin@123');
    console.log('Sample coupons: WELCOME10, SAVE20, SUMMER25, FREESHIP');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
