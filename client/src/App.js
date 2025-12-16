
import React, { useEffect } from 'react';
import ErrorBoundary from './pages/ErrorBoundary';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import NotificationPopup from './components/NotificationPopup';

// Public Pages
import HomePage from './pages/public/HomePage';
import MenuPage from './pages/public/MenuPage';
import AboutPage from './pages/public/AboutPage';
import GalleryPage from './pages/public/GalleryPage';
import ContactPage from './pages/public/ContactPage';
import ReservationPage from './pages/public/ReservationPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Customer Portal
import CustomerDashboard from './pages/customer/CustomerDashboard';
import ProfilePage from './pages/customer/ProfilePage';
import OrdersPage from './pages/customer/OrdersPage';
import FavoritesPage from './pages/customer/FavoritesPage';
import MyReservationsPage from './pages/customer/MyReservationsPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import PaymentPage from './pages/customer/PaymentPage';

// Admin Panel
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminReservations from './pages/admin/AdminReservations';
import AdminMenu from './pages/admin/AdminMenu';
import AdminGallery from './pages/admin/AdminGallery';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReviews from './pages/admin/AdminReviews';
import AdminSEO from './pages/admin/AdminSEO';
import AdminHero from './pages/admin/AdminHero';
import AdminAbout from './pages/admin/AdminAbout';
import AdminFeatures from './pages/admin/AdminFeatures';
import AdminTeam from './pages/admin/AdminTeam';
import AdminContactInfo from './pages/admin/AdminContactInfo';
import AdminSiteSettings from './pages/admin/AdminSiteSettings';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminRoles from './pages/admin/AdminRoles';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  // Load data from sampleDataFull.json only on first load
  useEffect(() => {
    const initializeData = async () => {
      try {
        const existingData = localStorage.getItem('cafe_data');
        const dataVersion = localStorage.getItem('cafe_data_version');
        const currentVersion = '2.2'; // Version with dynamic data
        
        // Load if no data exists OR version is outdated OR data is empty
        const shouldLoad = !existingData || 
                          dataVersion !== currentVersion || 
                          (existingData && JSON.parse(existingData).menuItems?.length === 0);
        
        if (shouldLoad) {
          console.log('Loading data from sampleDataFull.json...');
          const response = await fetch('/sampleDataFull.json');
          const data = await response.json();
          
          console.log('Sample data loaded:', {
            customers: data.customers?.length,
            menuItems: data.menuItems?.length,
            orders: data.orders?.length,
            reservations: data.reservations?.length,
            reviews: data.reviews?.length,
            gallery: data.gallery?.length,
            team: data.team?.length,
            features: data.features?.length
          });
          
          // Always inject demo and admin users at the beginning
          const demoUser = {
            id: 'demo001',
            table_type: 'user',
            name: 'Demo User',
            email: 'demo@demo.com',
            username: 'demo',
            password: 'demo',
            phone: '+91-98765-43210',
            role: 'customer',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
            address_street: '456 Demo Street',
            address_city: 'Mumbai',
            address_state: 'Maharashtra',
            address_zipcode: '400001',
            address_country: 'India',
            favorite_items: [],
            permissions: ['view_dashboard', 'view_orders', 'view_menu', 'view_reservations'],
            refresh_token: '',
            is_active: true,
            email_verified: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          const adminUser = {
            id: 'admin000',
            table_type: 'user',
            name: 'Admin',
            email: 'admin@admin.com',
            username: 'admin',
            password: 'admin',
            phone: '+91-98765-43211',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
            address_street: '123 Admin Avenue',
            address_city: 'Mumbai',
            address_state: 'Maharashtra',
            address_zipcode: '400001',
            address_country: 'India',
            favorite_items: [],
            permissions: ['all'],
            refresh_token: '',
            is_active: true,
            email_verified: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          // Remove any existing demo/admin users to avoid duplicates
          const customers = data.customers || [];
          const filteredCustomers = customers.filter(u => 
            u.username !== 'demo' && 
            u.username !== 'admin' && 
            u.email !== 'demo@demo.com' && 
            u.email !== 'admin@admin.com'
          );
          
          // Add demo and admin at the beginning
          filteredCustomers.unshift(demoUser, adminUser);
          
          // Normalize field names for localStorage compatibility
          const normalizedData = {
            users: filteredCustomers,  // customers → users
            menu: data.menuItems || data.menu || [],
            orders: data.orders || [],
            reservations: data.reservations || [],
            coupons: data.coupons || [],
            gallery: data.gallery || [],
            reviews: data.reviews || [],
            features: data.features || [],
            team: data.team || [],
            about: data.about || [],
            contact: data.contact || [],
            version: currentVersion
          };
          
          localStorage.setItem('cafe_data', JSON.stringify(normalizedData));
          localStorage.setItem('cafe_data_version', currentVersion);
          console.log('✅ Data loaded with demo/admin users!');
          console.log('Loaded:', {
            users: normalizedData.users.length,
            menu: normalizedData.menu.length,
            orders: normalizedData.orders.length,
            reservations: normalizedData.reservations.length,
            reviews: normalizedData.reviews.length,
            gallery: normalizedData.gallery.length,
            team: normalizedData.team.length,
            features: normalizedData.features.length
          });
          
          // Only reload once after initial data load
          if (existingData && dataVersion !== currentVersion) {
            console.log('🔄 Data updated! Reloading page once...');
            window.location.reload();
          }
        }
      } catch (error) {
        console.error('❌ Error loading data:', error);
      }
    };

    initializeData();
  }, []);

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow bg-gray-50 dark:bg-gray-800">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/reservations" element={<ReservationPage />} />
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Customer Portal */}
            <Route path="/customer" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
            <Route path="/customer/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/customer/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/customer/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
            <Route path="/customer/reservations" element={<ProtectedRoute><MyReservationsPage /></ProtectedRoute>} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
            {/* Admin Panel */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute roles={["admin", "staff"]} permissions={["view_dashboard", "view_analytics"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute roles={["admin", "staff"]} permissions={["view_orders", "edit_orders", "delete_orders"]}><AdminOrders /></ProtectedRoute>} />
            <Route path="/admin/reservations" element={<ProtectedRoute roles={["admin", "staff"]} permissions={["view_reservations", "edit_reservations", "delete_reservations"]}><AdminReservations /></ProtectedRoute>} />
            <Route path="/admin/menu" element={<ProtectedRoute roles={["admin", "staff"]} permissions={["view_menu", "add_menu", "edit_menu", "delete_menu", "toggle_availability"]}><AdminMenu /></ProtectedRoute>} />
            <Route path="/admin/gallery" element={<ProtectedRoute roles={["admin", "staff"]} permissions={["view_gallery", "add_gallery", "edit_gallery", "delete_gallery"]}><AdminGallery /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]} permissions={["view_users", "edit_users", "delete_users", "manage_roles"]}><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute roles={["admin", "staff"]} permissions={["view_reviews", "edit_reviews", "delete_reviews"]}><AdminReviews /></ProtectedRoute>} />
            <Route path="/admin/seo" element={<ProtectedRoute roles={["admin"]} permissions={["view_cms", "edit_seo"]}><AdminSEO /></ProtectedRoute>} />
            <Route path="/admin/hero" element={<ProtectedRoute roles={["admin"]} permissions={["view_cms", "edit_hero"]}><AdminHero /></ProtectedRoute>} />
            <Route path="/admin/about" element={<ProtectedRoute roles={["admin"]} permissions={["view_cms", "edit_about"]}><AdminAbout /></ProtectedRoute>} />
            <Route path="/admin/features" element={<ProtectedRoute roles={["admin"]} permissions={["view_cms", "edit_features"]}><AdminFeatures /></ProtectedRoute>} />
            <Route path="/admin/team" element={<ProtectedRoute roles={["admin"]} permissions={["view_cms", "edit_team"]}><AdminTeam /></ProtectedRoute>} />
            <Route path="/admin/contact-info" element={<ProtectedRoute roles={["admin"]} permissions={["view_cms", "edit_contact"]}><AdminContactInfo /></ProtectedRoute>} />
            <Route path="/admin/site-settings" element={<ProtectedRoute roles={["admin"]} permissions={["view_cms", "edit_settings"]}><AdminSiteSettings /></ProtectedRoute>} />
            <Route path="/admin/coupons" element={<ProtectedRoute roles={["admin"]} permissions={["view_coupons", "add_coupons", "edit_coupons", "delete_coupons"]}><AdminCoupons /></ProtectedRoute>} />
            <Route path="/admin/roles" element={<ProtectedRoute roles={["admin"]} permissions={["manage_roles"]}><AdminRoles /></ProtectedRoute>} />
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <NotificationPopup />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
