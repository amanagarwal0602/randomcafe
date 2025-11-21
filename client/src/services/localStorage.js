// LocalStorage Database - Temporary replacement for SheetDB
// Same column names as SheetDB for easy migration

// Helper function to generate unique IDs
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// Helper function to get current timestamp
const getTimestamp = () => new Date().toISOString();

// Initialize localStorage with default data
const initializeData = () => {
  const existingData = localStorage.getItem('cafe_data');
  
  // Check if we need to reinitialize (old version or missing data)
  let needsReinit = false;
  if (!existingData) {
    needsReinit = true;
  } else {
    try {
      const parsed = JSON.parse(existingData);
      // Check if hero fields exist in about section
      if (!parsed.about || parsed.about.length === 0 || !parsed.about[0].hero_title) {
        console.log('Old data structure detected, reinitializing...');
        needsReinit = true;
      }
    } catch (e) {
      needsReinit = true;
    }
  }
  
  if (needsReinit) {
    const now = getTimestamp();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const defaultData = {
      users: [
        {
          id: 'admin001',
          table_type: 'user',
          name: 'Admin User',
          email: 'admin@lumierecafe.com',
          password: 'Admin@123',
          phone: '+1-555-0100',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          address_street: '123 Admin Ave',
          address_city: 'New York',
          address_state: 'NY',
          address_zipcode: '10001',
          address_country: 'USA',
          favorite_items: [],
          permissions: ['all'],
          refresh_token: '',
          is_active: true,
          email_verified: true,
          created_at: now,
          updated_at: now
        },
        {
          id: 'chef001',
          table_type: 'user',
          name: 'Chef Marco',
          email: 'chef@lumierecafe.com',
          password: 'Chef@123',
          phone: '+1-555-0101',
          role: 'chef',
          avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100',
          address_street: '456 Kitchen Blvd',
          address_city: 'New York',
          address_state: 'NY',
          address_zipcode: '10002',
          address_country: 'USA',
          favorite_items: [],
          permissions: ['orders.view', 'orders.edit', 'menu.view'],
          refresh_token: '',
          is_active: true,
          email_verified: true,
          created_at: now,
          updated_at: now
        },
        {
          id: 'waiter001',
          table_type: 'user',
          name: 'Alex Server',
          email: 'waiter@lumierecafe.com',
          password: 'Waiter@123',
          phone: '+1-555-0102',
          role: 'waiter',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          address_street: '789 Service St',
          address_city: 'New York',
          address_state: 'NY',
          address_zipcode: '10003',
          address_country: 'USA',
          favorite_items: [],
          permissions: ['orders.view', 'orders.create', 'reservations.view', 'reservations.edit'],
          refresh_token: '',
          is_active: true,
          email_verified: true,
          created_at: now,
          updated_at: now
        },
        {
          id: 'user001',
          table_type: 'user',
          name: 'Sarah Williams',
          email: 'sarah@example.com',
          password: 'Customer@123',
          phone: '+1-555-1001',
          role: 'customer',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
          address_street: '321 Customer Lane',
          address_city: 'New York',
          address_state: 'NY',
          address_zipcode: '10004',
          address_country: 'USA',
          favorite_items: ['menu001', 'menu002'],
          permissions: [],
          refresh_token: '',
          is_active: true,
          email_verified: true,
          created_at: yesterday.toISOString(),
          updated_at: now
        },
        {
          id: 'user002',
          table_type: 'user',
          name: 'Michael Chen',
          email: 'michael@example.com',
          password: 'Customer@123',
          phone: '+1-555-1002',
          role: 'customer',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
          address_street: '654 Dining Dr',
          address_city: 'Brooklyn',
          address_state: 'NY',
          address_zipcode: '11201',
          address_country: 'USA',
          favorite_items: ['menu003', 'menu005'],
          permissions: [],
          refresh_token: '',
          is_active: true,
          email_verified: true,
          created_at: yesterday.toISOString(),
          updated_at: now
        },
        {
          id: 'user003',
          table_type: 'user',
          name: 'Emily Rodriguez',
          email: 'emily@example.com',
          password: 'Customer@123',
          phone: '+1-555-1003',
          role: 'customer',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
          address_street: '987 Food Street',
          address_city: 'Queens',
          address_state: 'NY',
          address_zipcode: '11354',
          address_country: 'USA',
          favorite_items: ['menu004', 'menu006'],
          permissions: [],
          refresh_token: '',
          is_active: true,
          email_verified: true,
          created_at: yesterday.toISOString(),
          updated_at: now
        }
      ],
      menu: [
        {
          id: 'menu001',
          table_type: 'menu',
          name: 'Margherita Pizza',
          description: 'Classic Italian pizza with tomato, mozzarella, and basil',
          price: 12.99,
          category: 'Pizza',
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
          is_available: true,
          is_veg: true,
          spicy_level: 0,
          ingredients: ['Tomato', 'Mozzarella', 'Basil'],
          allergens: ['Dairy', 'Gluten'],
          nutrition_calories: 250,
          nutrition_protein: 12,
          nutrition_carbs: 30,
          nutrition_fat: 8,
          prep_time: 15,
          rating: 4.5,
          rating_count: 120,
          order_count: 2,
          created_at: now,
          updated_at: now
        },
        {
          id: 'menu002',
          table_type: 'menu',
          name: 'Chicken Burger',
          description: 'Grilled chicken burger with lettuce, tomato, and special sauce',
          price: 9.99,
          category: 'Burgers',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
          is_available: true,
          is_veg: false,
          spicy_level: 1,
          ingredients: ['Chicken', 'Lettuce', 'Tomato', 'Bun'],
          allergens: ['Gluten', 'Egg'],
          nutrition_calories: 450,
          nutrition_protein: 35,
          nutrition_carbs: 40,
          nutrition_fat: 15,
          prep_time: 20,
          rating: 4.7,
          rating_count: 95,
          order_count: 3,
          created_at: now,
          updated_at: now
        },
        {
          id: 'menu003',
          table_type: 'menu',
          name: 'Caesar Salad',
          description: 'Fresh romaine lettuce with Caesar dressing and croutons',
          price: 7.99,
          category: 'Salads',
          image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
          is_available: true,
          is_veg: true,
          spicy_level: 0,
          ingredients: ['Lettuce', 'Caesar Dressing', 'Croutons', 'Parmesan'],
          allergens: ['Dairy', 'Gluten'],
          nutrition_calories: 180,
          nutrition_protein: 8,
          nutrition_carbs: 12,
          nutrition_fat: 12,
          prep_time: 10,
          rating: 4.3,
          rating_count: 75,
          order_count: 1,
          created_at: now,
          updated_at: now
        },
        {
          id: 'menu004',
          table_type: 'menu',
          name: 'Espresso',
          description: 'Rich and bold Italian espresso',
          price: 3.99,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400',
          is_available: true,
          is_veg: true,
          spicy_level: 0,
          ingredients: ['Espresso Beans', 'Water'],
          allergens: [],
          nutrition_calories: 5,
          nutrition_protein: 0,
          nutrition_carbs: 1,
          nutrition_fat: 0,
          prep_time: 3,
          rating: 4.8,
          rating_count: 200,
          order_count: 5,
          created_at: now,
          updated_at: now
        },
        {
          id: 'menu005',
          table_type: 'menu',
          name: 'Chocolate Lava Cake',
          description: 'Warm chocolate cake with molten center',
          price: 6.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400',
          is_available: true,
          is_veg: true,
          spicy_level: 0,
          ingredients: ['Chocolate', 'Eggs', 'Butter', 'Sugar'],
          allergens: ['Dairy', 'Gluten', 'Egg'],
          nutrition_calories: 380,
          nutrition_protein: 6,
          nutrition_carbs: 42,
          nutrition_fat: 20,
          prep_time: 12,
          rating: 4.9,
          rating_count: 150,
          order_count: 4,
          created_at: now,
          updated_at: now
        },
        {
          id: 'menu006',
          table_type: 'menu',
          name: 'Caprese Sandwich',
          description: 'Fresh mozzarella, tomatoes, basil, and balsamic glaze',
          price: 8.49,
          category: 'Sandwiches',
          image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400',
          is_available: true,
          is_veg: true,
          spicy_level: 0,
          ingredients: ['Mozzarella', 'Tomatoes', 'Basil', 'Bread', 'Balsamic'],
          allergens: ['Dairy', 'Gluten'],
          nutrition_calories: 320,
          nutrition_protein: 15,
          nutrition_carbs: 35,
          nutrition_fat: 12,
          prep_time: 8,
          rating: 4.6,
          rating_count: 88,
          order_count: 2,
          created_at: now,
          updated_at: now
        }
      ],
      orders: [
        {
          id: 'order001',
          table_type: 'order',
          user_id: 'user001',
          user_name: 'Sarah Williams',
          user_email: 'sarah@example.com',
          user_phone: '+1-555-1001',
          items: [
            { id: 'menu001', name: 'Margherita Pizza', price: 12.99, quantity: 2 },
            { id: 'menu003', name: 'Caesar Salad', price: 7.99, quantity: 1 }
          ],
          subtotal: 33.97,
          tax: 3.40,
          delivery_fee: 5.00,
          total: 42.37,
          status: 'delivered',
          payment_method: 'card',
          payment_status: 'paid',
          delivery_address: '321 Customer Lane, New York, NY 10004',
          notes: 'Please ring doorbell',
          created_at: new Date('2024-12-15').toISOString(),
          updated_at: new Date('2024-12-15').toISOString()
        },
        {
          id: 'order002',
          table_type: 'order',
          user_id: 'user002',
          user_name: 'Michael Chen',
          user_email: 'michael@example.com',
          user_phone: '+1-555-1002',
          items: [
            { id: 'menu002', name: 'Chicken Burger', price: 9.99, quantity: 1 },
            { id: 'menu004', name: 'Espresso', price: 3.99, quantity: 2 },
            { id: 'menu005', name: 'Chocolate Lava Cake', price: 6.99, quantity: 1 }
          ],
          subtotal: 24.96,
          tax: 2.50,
          delivery_fee: 4.50,
          total: 31.96,
          status: 'delivered',
          payment_method: 'cash',
          payment_status: 'paid',
          delivery_address: '654 Dining Dr, Brooklyn, NY 11201',
          notes: '',
          created_at: yesterday.toISOString(),
          updated_at: yesterday.toISOString()
        },
        {
          id: 'order003',
          table_type: 'order',
          user_id: 'user003',
          user_name: 'Emily Rodriguez',
          user_email: 'emily@example.com',
          user_phone: '+1-555-1003',
          items: [
            { id: 'menu006', name: 'Caprese Sandwich', price: 8.49, quantity: 2 },
            { id: 'menu004', name: 'Espresso', price: 3.99, quantity: 2 }
          ],
          subtotal: 24.96,
          tax: 2.50,
          delivery_fee: 4.00,
          total: 31.46,
          status: 'preparing',
          payment_method: 'card',
          payment_status: 'paid',
          delivery_address: '987 Food Street, Queens, NY 11354',
          notes: 'Extra napkins please',
          created_at: now,
          updated_at: now
        },
        {
          id: 'order004',
          table_type: 'order',
          user_id: 'user001',
          user_name: 'Sarah Williams',
          user_email: 'sarah@example.com',
          user_phone: '+1-555-1001',
          items: [
            { id: 'menu005', name: 'Chocolate Lava Cake', price: 6.99, quantity: 3 },
            { id: 'menu004', name: 'Espresso', price: 3.99, quantity: 3 }
          ],
          subtotal: 32.94,
          tax: 3.29,
          delivery_fee: 0,
          total: 36.23,
          status: 'delivered',
          payment_method: 'card',
          payment_status: 'paid',
          delivery_address: 'Dine-in',
          notes: 'Birthday celebration',
          created_at: new Date('2024-11-01').toISOString(),
          updated_at: new Date('2024-11-01').toISOString()
        },
        {
          id: 'order005',
          table_type: 'order',
          user_id: 'user002',
          user_name: 'Michael Chen',
          user_email: 'michael@example.com',
          user_phone: '+1-555-1002',
          items: [
            { id: 'menu001', name: 'Margherita Pizza', price: 12.99, quantity: 1 },
            { id: 'menu002', name: 'Chicken Burger', price: 9.99, quantity: 1 }
          ],
          subtotal: 22.98,
          tax: 2.30,
          delivery_fee: 5.00,
          total: 30.28,
          status: 'delivered',
          payment_method: 'card',
          payment_status: 'paid',
          delivery_address: '654 Dining Dr, Brooklyn, NY 11201',
          notes: '',
          created_at: new Date('2024-10-20').toISOString(),
          updated_at: new Date('2024-10-20').toISOString()
        }
      ],
      reservations: [
        {
          id: 'res001',
          table_type: 'reservation',
          user_id: 'user001',
          guest_name: 'Sarah Williams',
          guest_email: 'sarah@example.com',
          guest_phone: '+1-555-1001',
          number_of_guests: 4,
          date: '2024-12-20',
          time_slot: '7:00 PM',
          special_requests: 'Window seat preferred',
          status: 'confirmed',
          created_at: new Date('2024-12-10').toISOString(),
          updated_at: new Date('2024-12-12').toISOString()
        },
        {
          id: 'res002',
          table_type: 'reservation',
          user_id: 'user002',
          guest_name: 'Michael Chen',
          guest_email: 'michael@example.com',
          guest_phone: '+1-555-1002',
          number_of_guests: 2,
          date: '2024-11-15',
          time_slot: '6:30 PM',
          special_requests: '',
          status: 'completed',
          created_at: new Date('2024-11-10').toISOString(),
          updated_at: new Date('2024-11-15').toISOString()
        },
        {
          id: 'res003',
          table_type: 'reservation',
          user_id: 'user003',
          guest_name: 'Emily Rodriguez',
          guest_email: 'emily@example.com',
          guest_phone: '+1-555-1003',
          number_of_guests: 6,
          date: '2025-11-25',
          time_slot: '7:30 PM',
          special_requests: 'Anniversary celebration, need cake service',
          status: 'pending',
          created_at: now,
          updated_at: now
        }
      ],
      coupons: [
        {
          id: 'coupon001',
          table_type: 'coupon',
          code: 'WELCOME10',
          description: '10% off for new customers',
          discount_type: 'percentage',
          discount_value: 10,
          min_order_value: 20,
          max_discount: 10,
          usage_limit: 100,
          usage_count: 15,
          is_active: true,
          valid_from: new Date('2024-01-01').toISOString(),
          valid_until: new Date('2025-12-31').toISOString(),
          created_at: new Date('2024-01-01').toISOString(),
          updated_at: now
        },
        {
          id: 'coupon002',
          table_type: 'coupon',
          code: 'SAVE5',
          description: '$5 off on orders above $30',
          discount_type: 'fixed',
          discount_value: 5,
          min_order_value: 30,
          max_discount: 5,
          usage_limit: 50,
          usage_count: 8,
          is_active: true,
          valid_from: new Date('2024-06-01').toISOString(),
          valid_until: new Date('2025-06-30').toISOString(),
          created_at: new Date('2024-06-01').toISOString(),
          updated_at: now
        }
      ],
      gallery: [
        {
          id: 'gallery001',
          table_type: 'gallery',
          title: 'Cozy Interior',
          description: 'Our warm and inviting dining space',
          image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
          category: 'interior',
          is_active: true,
          order: 1,
          created_at: new Date('2024-01-01').toISOString(),
          updated_at: now
        },
        {
          id: 'gallery002',
          table_type: 'gallery',
          title: 'Artisan Coffee',
          description: 'Freshly brewed perfection',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
          category: 'food',
          is_active: true,
          order: 2,
          created_at: new Date('2024-01-01').toISOString(),
          updated_at: now
        },
        {
          id: 'gallery003',
          table_type: 'gallery',
          title: 'Gourmet Pizza',
          description: 'Wood-fired Italian pizza',
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
          category: 'food',
          is_active: true,
          order: 3,
          created_at: new Date('2024-01-01').toISOString(),
          updated_at: now
        },
        {
          id: 'gallery004',
          table_type: 'gallery',
          title: 'Fresh Pastries',
          description: 'Baked fresh daily',
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
          category: 'food',
          is_active: true,
          order: 4,
          created_at: new Date('2024-01-01').toISOString(),
          updated_at: now
        },
        {
          id: 'gallery005',
          table_type: 'gallery',
          title: 'Outdoor Seating',
          description: 'Enjoy dining al fresco',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
          category: 'interior',
          is_active: true,
          order: 5,
          created_at: new Date('2024-01-01').toISOString(),
          updated_at: now
        },
        {
          id: 'gallery006',
          table_type: 'gallery',
          title: 'Chef at Work',
          description: 'Culinary artistry in action',
          image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800',
          category: 'team',
          is_active: true,
          order: 6,
          created_at: new Date('2024-01-01').toISOString(),
          updated_at: now
        }
      ],
      reviews: [
        {
          id: 'review001',
          table_type: 'review',
          user_id: 'user001',
          user_name: 'Sarah Williams',
          user_email: 'sarah@example.com',
          menu_item_id: 'menu001',
          menu_item_name: 'Margherita Pizza',
          rating: 5,
          comment: 'Amazing atmosphere and incredible food. The coffee is the best I\'ve ever had! Highly recommend the brunch menu.',
          status: 'approved',
          created_at: new Date('2024-12-10').toISOString(),
          updated_at: now
        },
        {
          id: 'review002',
          table_type: 'review',
          user_id: 'user001',
          user_name: 'Michael Chen',
          user_email: 'michael@example.com',
          menu_item_id: 'menu002',
          menu_item_name: 'Chicken Burger',
          rating: 5,
          comment: 'Absolutely love this place! The service is outstanding and the food quality is consistently excellent. Will definitely come back!',
          status: 'approved',
          created_at: now,
          updated_at: now
        },
        {
          id: 'review003',
          table_type: 'review',
          user_id: 'user003',
          user_name: 'Emily Rodriguez',
          user_email: 'emily@example.com',
          menu_item_id: 'menu003',
          menu_item_name: 'Caesar Salad',
          rating: 4,
          comment: 'Great dining experience! The ambiance is perfect for both casual lunches and special occasions. Highly recommended!',
          status: 'approved',
          created_at: new Date('2024-11-20').toISOString(),
          updated_at: now
        },
        {
          id: 'review004',
          table_type: 'review',
          user_id: 'user002',
          user_name: 'Michael Chen',
          user_email: 'michael@example.com',
          menu_item_id: 'menu005',
          menu_item_name: 'Chocolate Lava Cake',
          rating: 5,
          comment: 'The dessert was absolutely divine! Rich, decadent, and perfectly balanced sweetness.',
          status: 'approved',
          created_at: new Date('2024-11-18').toISOString(),
          updated_at: now
        },
        {
          id: 'review005',
          table_type: 'review',
          user_id: 'user001',
          user_name: 'Sarah Williams',
          user_email: 'sarah@example.com',
          menu_item_id: 'menu004',
          menu_item_name: 'Espresso',
          rating: 5,
          comment: 'Best espresso in town! Rich, smooth, and perfectly extracted every time.',
          status: 'approved',
          created_at: new Date('2024-12-05').toISOString(),
          updated_at: now
        }
      ],
      features: [
        {
          id: 'feature001',
          table_type: 'feature',
          icon: '☕',
          title: 'Quality First',
          description: 'We never compromise on the quality of our ingredients or service.',
          order: 1,
          is_active: true,
          created_at: now,
          updated_at: now
        },
        {
          id: 'feature002',
          table_type: 'feature',
          icon: '🏆',
          title: 'Community',
          description: 'Building connections and supporting local businesses is at our core.',
          order: 2,
          is_active: true,
          created_at: now,
          updated_at: now
        },
        {
          id: 'feature003',
          table_type: 'feature',
          icon: '❤️',
          title: 'Passion',
          description: 'Every dish and drink is crafted with genuine care and expertise.',
          order: 3,
          is_active: true,
          created_at: now,
          updated_at: now
        }
      ],
      team: [
        {
          id: 'team001',
          table_type: 'team',
          name: 'John Smith',
          position: 'Head Chef',
          bio: 'Award-winning chef with 15+ years of culinary experience',
          image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400',
          email: 'chef@lumierecafe.com',
          phone: '+1234567890',
          social_links: JSON.stringify({ facebook: '', instagram: '', twitter: '', linkedin: '' }),
          order: 1,
          is_active: true,
          created_at: now,
          updated_at: now
        },
        {
          id: 'team002',
          table_type: 'team',
          name: 'Sarah Johnson',
          position: 'Manager',
          bio: 'Passionate about creating memorable dining experiences for our guests',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
          email: 'manager@lumierecafe.com',
          phone: '+1234567891',
          social_links: JSON.stringify({ facebook: '', instagram: '', twitter: '', linkedin: '' }),
          order: 2,
          is_active: true,
          created_at: now,
          updated_at: now
        }
      ],
      about: [
        {
          id: 'about001',
          table_type: 'about',
          title: 'Lumière',
          heading: 'Our Story',
          description: 'Our story, passion, and commitment to excellence',
          content: 'Founded in 2015, Lumière Café was born from a simple vision: to create a space where exceptional coffee meets culinary artistry. Our journey began with a small roastery and a passion for bringing people together over great food and drink.\n\nToday, we\'re proud to serve our community with ethically sourced, expertly crafted beverages and meals made from the finest local ingredients. Every cup, every plate tells a story of dedication, quality, and love for the craft.\n\nWe believe in sustainability, supporting local farmers, and creating memorable experiences for every guest who walks through our doors.',
          image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
          mission_title: 'Our Mission',
          mission_text: 'To provide an exceptional dining experience through quality food, outstanding service, and a welcoming atmosphere',
          vision_title: 'Our Vision',
          vision_text: 'To be the most beloved cafe in the community, known for our culinary excellence and warm hospitality',
          years_in_business: 10,
          happy_customers: 50000,
          menu_items: 150,
          awards: 5,
          hero_title: 'Welcome to Lumière',
          hero_subtitle: 'Where every cup tells a story and every bite is a journey to culinary excellence',
          hero_description: 'Experience the perfect blend of tradition and innovation',
          hero_background_image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200',
          hero_primary_button_text: 'Explore Menu',
          hero_primary_button_link: '/menu',
          hero_secondary_button_text: 'Reserve a Table',
          hero_secondary_button_link: '/reservations',
          hero_is_active: true,
          created_at: now,
          updated_at: now
        }
      ],
      contact: [
        {
          id: 'contact001',
          table_type: 'contact',
          address_street: '123 Artisan Street',
          address_city: 'Downtown District',
          address_state: 'NY',
          address_zipcode: '10001',
          address_country: 'USA',
          phone: '(555) 123-4567',
          email: 'hello@lumierecafe.com',
          opening_hours: JSON.stringify({
            monday: '7:00 AM - 10:00 PM',
            tuesday: '7:00 AM - 10:00 PM',
            wednesday: '7:00 AM - 10:00 PM',
            thursday: '7:00 AM - 10:00 PM',
            friday: '7:00 AM - 10:00 PM',
            saturday: '8:00 AM - 11:00 PM',
            sunday: '8:00 AM - 9:00 PM'
          }),
          map_latitude: 40.7128,
          map_longitude: -74.0060,
          social_facebook: 'https://facebook.com/lumierecafe',
          social_instagram: 'https://instagram.com/lumierecafe',
          social_twitter: 'https://twitter.com/lumierecafe',
          social_linkedin: '',
          created_at: now,
          updated_at: now
        }
      ]
    };
    localStorage.setItem('cafe_data', JSON.stringify(defaultData));
  }
};

// Get all data
const getData = () => {
  initializeData();
  return JSON.parse(localStorage.getItem('cafe_data'));
};

// Save all data
const saveData = (data) => {
  localStorage.setItem('cafe_data', JSON.stringify(data));
};

// ============ USERS ============
export const createUser = async (userData) => {
  const data = getData();
  const userId = generateId();
  const user = {
    id: userId,
    table_type: 'user',
    name: userData.name,
    email: userData.email,
    password: userData.password,
    phone: userData.phone || '',
    role: userData.role || 'customer',
    avatar: userData.avatar || '',
    address_street: userData.address?.street || '',
    address_city: userData.address?.city || '',
    address_state: userData.address?.state || '',
    address_zipcode: userData.address?.zipCode || '',
    address_country: userData.address?.country || '',
    favorite_items: userData.favoriteItems || [],
    permissions: userData.permissions || [],
    refresh_token: '',
    is_active: true,
    email_verified: false,
    created_at: getTimestamp(),
    updated_at: getTimestamp()
  };
  data.users.push(user);
  saveData(data);
  return user;
};

export const getUsers = async () => {
  const data = getData();
  return data.users || [];
};

export const getUserByEmail = async (email) => {
  const data = getData();
  return data.users.find(u => u.email === email) || null;
};

export const getUserById = async (id) => {
  const data = getData();
  return data.users.find(u => u.id === id) || null;
};

export const updateUser = async (id, updates) => {
  const data = getData();
  const index = data.users.findIndex(u => u.id === id);
  if (index !== -1) {
    data.users[index] = {
      ...data.users[index],
      ...updates,
      updated_at: getTimestamp()
    };
    saveData(data);
    return data.users[index];
  }
  throw new Error('User not found');
};

export const deleteUser = async (id) => {
  const data = getData();
  data.users = data.users.filter(u => u.id !== id);
  saveData(data);
  return true;
};

// ============ MENU ============
export const createMenuItem = async (itemData) => {
  const data = getData();
  const itemId = generateId();
  const item = {
    id: itemId,
    table_type: 'menu',
    name: itemData.name,
    description: itemData.description || '',
    price: parseFloat(itemData.price) || 0,
    category: itemData.category,
    image: itemData.image || '',
    is_available: itemData.isAvailable !== false,
    is_veg: itemData.isVeg || false,
    spicy_level: itemData.spicyLevel || 0,
    ingredients: itemData.ingredients || [],
    allergens: itemData.allergens || [],
    nutrition_calories: itemData.nutrition?.calories || 0,
    nutrition_protein: itemData.nutrition?.protein || 0,
    nutrition_carbs: itemData.nutrition?.carbs || 0,
    nutrition_fat: itemData.nutrition?.fat || 0,
    prep_time: itemData.prepTime || 0,
    rating: 0,
    rating_count: 0,
    order_count: 0,
    created_at: getTimestamp(),
    updated_at: getTimestamp()
  };
  data.menu.push(item);
  saveData(data);
  return item;
};

export const getMenuItems = async () => {
  const data = getData();
  return (data.menu || []).map(item => ({
    ...item,
    _id: item.id,
    image: item.image || item.imageUrl || item.image_url,
    price: parseFloat(item.price) || 0,
    isAvailable: item.is_available,
    isVeg: item.is_veg,
    spicyLevel: item.spicy_level,
    prepTime: item.prep_time,
    ratingCount: item.rating_count,
    nutrition: {
      calories: item.nutrition_calories,
      protein: item.nutrition_protein,
      carbs: item.nutrition_carbs,
      fat: item.nutrition_fat
    }
  }));
};

export const updateMenuItem = async (id, updates) => {
  const data = getData();
  const index = data.menu.findIndex(m => m.id === id);
  if (index !== -1) {
    data.menu[index] = {
      ...data.menu[index],
      name: updates.name || data.menu[index].name,
      description: updates.description !== undefined ? updates.description : data.menu[index].description,
      price: updates.price !== undefined ? parseFloat(updates.price) || 0 : data.menu[index].price,
      category: updates.category || data.menu[index].category,
      image: updates.image !== undefined ? updates.image : data.menu[index].image,
      is_available: updates.isAvailable !== undefined ? updates.isAvailable : data.menu[index].is_available,
      updated_at: getTimestamp()
    };
    saveData(data);
    return data.menu[index];
  }
  throw new Error('Menu item not found');
};

export const deleteMenuItem = async (id) => {
  const data = getData();
  data.menu = data.menu.filter(m => m.id !== id);
  saveData(data);
  return true;
};

// ============ ORDERS ============
export const createOrder = async (orderData) => {
  const data = getData();
  const orderId = generateId();
  const order = {
    id: orderId,
    table_type: 'order',
    user_id: orderData.userId,
    user_name: orderData.userName || '',
    user_email: orderData.userEmail || '',
    user_phone: orderData.userPhone || '',
    items: orderData.items || [],
    subtotal: orderData.subtotal,
    tax: orderData.tax || 0,
    delivery_fee: orderData.deliveryFee || 0,
    discount: orderData.discount || 0,
    coupon_code: orderData.couponCode || '',
    total: orderData.total,
    status: orderData.status || 'pending',
    payment_method: orderData.paymentMethod || 'cash',
    payment_status: orderData.paymentStatus || 'pending',
    delivery_type: orderData.deliveryType || 'delivery',
    delivery_address_street: orderData.deliveryAddress?.street || '',
    delivery_address_city: orderData.deliveryAddress?.city || '',
    delivery_address_state: orderData.deliveryAddress?.state || '',
    delivery_address_zipcode: orderData.deliveryAddress?.zipCode || '',
    delivery_address_country: orderData.deliveryAddress?.country || '',
    special_instructions: orderData.specialInstructions || '',
    estimated_delivery: orderData.estimatedDelivery || '',
    created_at: getTimestamp(),
    updated_at: getTimestamp()
  };
  data.orders.push(order);
  saveData(data);
  return order;
};

export const getOrders = async () => {
  const data = getData();
  return (data.orders || []).map(order => ({
    ...order,
    _id: order.id,
    total: order.total_price || order.total || 0,
    userId: order.user_id,
    userName: order.user_name,
    userEmail: order.user_email,
    userPhone: order.user_phone,
    customerName: order.user_name,
    customerEmail: order.user_email,
    deliveryFee: order.delivery_fee,
    couponCode: order.coupon_code,
    paymentMethod: order.payment_method,
    paymentStatus: order.payment_status,
    deliveryType: order.delivery_type,
    specialInstructions: order.special_instructions,
    estimatedDelivery: order.estimated_delivery,
    deliveryAddress: {
      street: order.delivery_address_street,
      city: order.delivery_address_city,
      state: order.delivery_address_state,
      zipCode: order.delivery_address_zipcode,
      country: order.delivery_address_country
    }
  }));
};

export const updateOrder = async (id, updates) => {
  const data = getData();
  const index = data.orders.findIndex(o => o.id === id);
  if (index !== -1) {
    data.orders[index] = {
      ...data.orders[index],
      status: updates.status || data.orders[index].status,
      payment_status: updates.paymentStatus || data.orders[index].payment_status,
      updated_at: getTimestamp()
    };
    saveData(data);
    return data.orders[index];
  }
  throw new Error('Order not found');
};

export const deleteOrder = async (id) => {
  const data = getData();
  data.orders = data.orders.filter(o => o.id !== id);
  saveData(data);
  return true;
};

// ============ RESERVATIONS ============
export const createReservation = async (resData) => {
  const data = getData();
  const resId = generateId();
  const reservation = {
    id: resId,
    table_type: 'reservation',
    user_id: resData.userId || '',
    guest_name: resData.guestName,
    guest_email: resData.guestEmail,
    guest_phone: resData.guestPhone,
    date: resData.date,
    time: resData.time,
    guests: resData.guests,
    table_number: resData.tableNumber || '',
    status: resData.status || 'pending',
    special_requests: resData.specialRequests || '',
    created_at: getTimestamp(),
    updated_at: getTimestamp()
  };
  data.reservations.push(reservation);
  saveData(data);
  return reservation;
};

export const getReservations = async () => {
  const data = getData();
  return (data.reservations || []).map(res => ({
    ...res,
    _id: res.id,
    userId: res.user_id,
    guestName: res.guest_name,
    guestEmail: res.guest_email,
    guestPhone: res.guest_phone,
    tableNumber: res.table_number,
    specialRequests: res.special_requests
  }));
};

export const updateReservation = async (id, updates) => {
  const data = getData();
  const index = data.reservations.findIndex(r => r.id === id);
  if (index !== -1) {
    data.reservations[index] = {
      ...data.reservations[index],
      status: updates.status || data.reservations[index].status,
      table_number: updates.tableNumber !== undefined ? updates.tableNumber : data.reservations[index].table_number,
      updated_at: getTimestamp()
    };
    saveData(data);
    return data.reservations[index];
  }
  throw new Error('Reservation not found');
};

export const deleteReservation = async (id) => {
  const data = getData();
  data.reservations = data.reservations.filter(r => r.id !== id);
  saveData(data);
  return true;
};

// ============ COUPONS ============
export const createCoupon = async (couponData) => {
  const data = getData();
  const couponId = generateId();
  const coupon = {
    id: couponId,
    table_type: 'coupon',
    code: couponData.code,
    description: couponData.description || '',
    discount_type: couponData.discountType,
    discount_value: couponData.discountValue,
    min_order_value: couponData.minOrderValue || 0,
    max_discount: couponData.maxDiscount || 0,
    valid_from: couponData.validFrom,
    valid_until: couponData.validUntil,
    usage_limit: couponData.usageLimit || 0,
    used_count: 0,
    is_active: couponData.isActive !== false,
    created_at: getTimestamp(),
    updated_at: getTimestamp()
  };
  data.coupons.push(coupon);
  saveData(data);
  return coupon;
};

export const getCoupons = async () => {
  const data = getData();
  return (data.coupons || []).map(coupon => ({
    ...coupon,
    _id: coupon.id,
    discountType: coupon.discount_type,
    discountValue: coupon.discount_value,
    minOrderValue: coupon.min_order_value,
    maxDiscount: coupon.max_discount,
    validFrom: coupon.valid_from,
    validUntil: coupon.valid_until,
    usageLimit: coupon.usage_limit,
    usedCount: coupon.used_count,
    isActive: coupon.is_active
  }));
};

export const updateCoupon = async (id, updates) => {
  const data = getData();
  const index = data.coupons.findIndex(c => c.id === id);
  if (index !== -1) {
    data.coupons[index] = {
      ...data.coupons[index],
      is_active: updates.isActive !== undefined ? updates.isActive : data.coupons[index].is_active,
      updated_at: getTimestamp()
    };
    saveData(data);
    return data.coupons[index];
  }
  throw new Error('Coupon not found');
};

export const deleteCoupon = async (id) => {
  const data = getData();
  data.coupons = data.coupons.filter(c => c.id !== id);
  saveData(data);
  return true;
};

export const validateCoupon = async (code) => {
  const data = getData();
  const coupon = data.coupons.find(c => c.code === code && c.is_active);
  if (!coupon) throw new Error('Invalid coupon code');
  
  const now = new Date();
  const validFrom = new Date(coupon.valid_from);
  const validUntil = new Date(coupon.valid_until);
  
  if (now < validFrom || now > validUntil) {
    throw new Error('Coupon has expired');
  }
  
  if (coupon.usage_limit > 0 && coupon.used_count >= coupon.usage_limit) {
    throw new Error('Coupon usage limit reached');
  }
  
  return coupon;
};

// ============ GALLERY ============
export const createGalleryImage = async (imageData) => {
  const data = getData();
  const imageId = generateId();
  const image = {
    id: imageId,
    table_type: 'gallery',
    url: imageData.url,
    title: imageData.title || '',
    description: imageData.description || '',
    category: imageData.category || 'general',
    is_featured: imageData.isFeatured || false,
    created_at: getTimestamp(),
    updated_at: getTimestamp()
  };
  data.gallery.push(image);
  saveData(data);
  return image;
};

export const getGalleryImages = async () => {
  const data = getData();
  return (data.gallery || []).map(img => ({
    ...img,
    _id: img.id,
    isFeatured: img.is_featured
  }));
};

export const updateGalleryImage = async (id, updates) => {
  const data = getData();
  const index = data.gallery.findIndex(g => g.id === id);
  if (index !== -1) {
    data.gallery[index] = {
      ...data.gallery[index],
      ...updates,
      updated_at: getTimestamp()
    };
    saveData(data);
    return data.gallery[index];
  }
  throw new Error('Gallery image not found');
};

export const deleteGalleryImage = async (id) => {
  const data = getData();
  data.gallery = data.gallery.filter(g => g.id !== id);
  saveData(data);
  return true;
};

// ============ REVIEWS ============
export const createReview = async (reviewData) => {
  const data = getData();
  const reviewId = generateId();
  const review = {
    id: reviewId,
    table_type: 'review',
    user_id: reviewData.userId,
    user_name: reviewData.userName || '',
    user_avatar: reviewData.userAvatar || '',
    menu_item_id: reviewData.menuItemId || '',
    rating: reviewData.rating,
    comment: reviewData.comment || '',
    is_verified: reviewData.isVerified || false,
    is_approved: reviewData.isApproved || false,
    created_at: getTimestamp(),
    updated_at: getTimestamp()
  };
  data.reviews.push(review);
  saveData(data);
  return review;
};

export const getReviews = async () => {
  const data = getData();
  return (data.reviews || []).map(review => ({
    ...review,
    _id: review.id,
    userId: review.user_id,
    userName: review.user_name,
    userAvatar: review.user_avatar,
    menuItemId: review.menu_item_id,
    isVerified: review.is_verified,
    isApproved: review.is_approved
  }));
};

export const updateReview = async (id, updates) => {
  const data = getData();
  const index = data.reviews.findIndex(r => r.id === id);
  if (index !== -1) {
    data.reviews[index] = {
      ...data.reviews[index],
      is_approved: updates.isApproved !== undefined ? updates.isApproved : data.reviews[index].is_approved,
      updated_at: getTimestamp()
    };
    saveData(data);
    return data.reviews[index];
  }
  throw new Error('Review not found');
};

export const deleteReview = async (id) => {
  const data = getData();
  data.reviews = data.reviews.filter(r => r.id !== id);
  saveData(data);
  return true;
};

// ============ FEATURES (About Section) ============
export const createFeature = async (featureData) => {
  const data = getData();
  const featureId = generateId();
  const feature = {
    id: featureId,
    table_type: 'feature',
    icon: featureData.icon,
    title: featureData.title,
    description: featureData.description,
    created_at: getTimestamp(),
    updated_at: getTimestamp()
  };
  data.features.push(feature);
  saveData(data);
  return feature;
};

export const getFeatures = async () => {
  const data = getData();
  return (data.features || []).map(f => ({ ...f, _id: f.id }));
};

export const updateFeature = async (id, updates) => {
  const data = getData();
  const index = data.features.findIndex(f => f.id === id);
  if (index !== -1) {
    data.features[index] = {
      ...data.features[index],
      ...updates,
      updated_at: getTimestamp()
    };
    saveData(data);
    return data.features[index];
  }
  throw new Error('Feature not found');
};

export const deleteFeature = async (id) => {
  const data = getData();
  data.features = data.features.filter(f => f.id !== id);
  saveData(data);
  return true;
};

// ============ TEAM ============
export const createTeamMember = async (memberData) => {
  const data = getData();
  const memberId = generateId();
  const member = {
    id: memberId,
    table_type: 'team',
    name: memberData.name,
    role: memberData.role,
    bio: memberData.bio || '',
    image: memberData.image || '',
    social_twitter: memberData.social?.twitter || '',
    social_facebook: memberData.social?.facebook || '',
    social_instagram: memberData.social?.instagram || '',
    social_linkedin: memberData.social?.linkedin || '',
    created_at: getTimestamp(),
    updated_at: getTimestamp()
  };
  data.team.push(member);
  saveData(data);
  return member;
};

export const getTeamMembers = async () => {
  const data = getData();
  return (data.team || []).map(member => ({
    ...member,
    _id: member.id,
    social: {
      twitter: member.social_twitter,
      facebook: member.social_facebook,
      instagram: member.social_instagram,
      linkedin: member.social_linkedin
    }
  }));
};

export const updateTeamMember = async (id, updates) => {
  const data = getData();
  const index = data.team.findIndex(t => t.id === id);
  if (index !== -1) {
    data.team[index] = {
      ...data.team[index],
      ...updates,
      updated_at: getTimestamp()
    };
    saveData(data);
    return data.team[index];
  }
  throw new Error('Team member not found');
};

export const deleteTeamMember = async (id) => {
  const data = getData();
  data.team = data.team.filter(t => t.id !== id);
  saveData(data);
  return true;
};

// ============ ABOUT/CONTACT CONTENT ============
export const updateAboutContent = async (content) => {
  const data = getData();
  if (!data.about || !Array.isArray(data.about) || data.about.length === 0) {
    data.about = [{
      id: 'about001',
      table_type: 'about',
      created_at: getTimestamp()
    }];
  }
  
  data.about[0] = {
    ...data.about[0],
    title: content.title || data.about[0].title || '',
    heading: content.heading || data.about[0].heading || '',
    description: content.description || data.about[0].description || '',
    content: content.content || data.about[0].content || '',
    image: content.image || data.about[0].image || '',
    mission_title: content.missionTitle || data.about[0].mission_title || '',
    mission_text: content.missionText || data.about[0].mission_text || '',
    vision_title: content.visionTitle || data.about[0].vision_title || '',
    vision_text: content.visionText || data.about[0].vision_text || '',
    years_in_business: content.yearsInBusiness !== undefined ? content.yearsInBusiness : data.about[0].years_in_business || 0,
    happy_customers: content.happyCustomers !== undefined ? content.happyCustomers : data.about[0].happy_customers || 0,
    menu_items: content.menuItems !== undefined ? content.menuItems : data.about[0].menu_items || 0,
    awards: content.awards !== undefined ? content.awards : data.about[0].awards || 0,
    hero_title: content.title || data.about[0].hero_title || '',
    hero_subtitle: content.subtitle || data.about[0].hero_subtitle || '',
    hero_description: content.description || data.about[0].hero_description || '',
    hero_background_image: content.backgroundImage || data.about[0].hero_background_image || '',
    hero_primary_button_text: content.primaryButtonText || data.about[0].hero_primary_button_text || '',
    hero_primary_button_link: content.primaryButtonLink || data.about[0].hero_primary_button_link || '',
    hero_secondary_button_text: content.secondaryButtonText || data.about[0].hero_secondary_button_text || '',
    hero_secondary_button_link: content.secondaryButtonLink || data.about[0].hero_secondary_button_link || '',
    hero_is_active: content.isActive !== undefined ? content.isActive : data.about[0].hero_is_active !== false,
    updated_at: getTimestamp()
  };
  saveData(data);
  return data.about[0];
};

export const getAboutContent = async () => {
  const data = getData();
  const about = (data.about && Array.isArray(data.about) && data.about.length > 0) ? data.about[0] : {};
  return {
    _id: about.id,
    id: about.id,
    title: about.title || about.hero_title || '',
    heading: about.heading || '',
    description: about.description || about.hero_description || '',
    content: about.content || '',
    image: about.image || '',
    missionTitle: about.mission_title || '',
    missionText: about.mission_text || '',
    visionTitle: about.vision_title || '',
    visionText: about.vision_text || '',
    yearsInBusiness: about.years_in_business || 0,
    happyCustomers: about.happy_customers || 0,
    menuItems: about.menu_items || 0,
    awards: about.awards || 0,
    subtitle: about.hero_subtitle || '',
    backgroundImage: about.hero_background_image || '',
    primaryButtonText: about.hero_primary_button_text || '',
    primaryButtonLink: about.hero_primary_button_link || '',
    secondaryButtonText: about.hero_secondary_button_text || '',
    secondaryButtonLink: about.hero_secondary_button_link || '',
    isActive: about.hero_is_active !== false
  };
};

export const updateContactInfo = async (contact) => {
  const data = getData();
  if (!data.contact || !Array.isArray(data.contact) || data.contact.length === 0) {
    data.contact = [{
      id: 'contact001',
      table_type: 'contact',
      created_at: getTimestamp()
    }];
  }
  
  data.contact[0] = {
    ...data.contact[0],
    address_street: contact.addressStreet || contact.address?.street || data.contact[0].address_street || '',
    address_city: contact.addressCity || contact.address?.city || data.contact[0].address_city || '',
    address_state: contact.addressState || contact.address?.state || data.contact[0].address_state || '',
    address_zipcode: contact.addressZipcode || contact.address?.zipcode || data.contact[0].address_zipcode || '',
    address_country: contact.addressCountry || contact.address?.country || data.contact[0].address_country || '',
    phone: contact.phone || data.contact[0].phone || '',
    email: contact.email || data.contact[0].email || '',
    opening_hours: contact.openingHours ? JSON.stringify(contact.openingHours) : data.contact[0].opening_hours || '',
    map_latitude: contact.mapLatitude || data.contact[0].map_latitude || 0,
    map_longitude: contact.mapLongitude || data.contact[0].map_longitude || 0,
    social_facebook: contact.socialFacebook || contact.social?.facebook || data.contact[0].social_facebook || '',
    social_instagram: contact.socialInstagram || contact.social?.instagram || data.contact[0].social_instagram || '',
    social_twitter: contact.socialTwitter || contact.social?.twitter || data.contact[0].social_twitter || '',
    social_linkedin: contact.socialLinkedin || contact.social?.linkedin || data.contact[0].social_linkedin || '',
    updated_at: getTimestamp()
  };
  saveData(data);
  return data.contact[0];
};

export const getContactInfo = async () => {
  const data = getData();
  const contact = (data.contact && Array.isArray(data.contact) && data.contact.length > 0) ? data.contact[0] : {};
  return {
    _id: contact.id,
    addressStreet: contact.address_street || '',
    addressCity: contact.address_city || '',
    addressState: contact.address_state || '',
    addressZipcode: contact.address_zipcode || '',
    addressCountry: contact.address_country || '',
    phone: contact.phone || '',
    email: contact.email || '',
    openingHours: contact.opening_hours ? JSON.parse(contact.opening_hours) : {},
    mapLatitude: contact.map_latitude || 0,
    mapLongitude: contact.map_longitude || 0,
    socialFacebook: contact.social_facebook || '',
    socialInstagram: contact.social_instagram || '',
    socialTwitter: contact.social_twitter || '',
    socialLinkedin: contact.social_linkedin || ''
  };
};

// Initialize on module load
initializeData();
