import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

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

// Components
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      
      <main className="flex-grow">
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
          
          {/* Admin Panel */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin', 'staff']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute roles={['admin', 'staff']}><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/reservations" element={<ProtectedRoute roles={['admin', 'staff']}><AdminReservations /></ProtectedRoute>} />
          <Route path="/admin/menu" element={<ProtectedRoute roles={['admin', 'staff']}><AdminMenu /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute roles={['admin', 'staff']}><AdminGallery /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute roles={['admin', 'staff']}><AdminReviews /></ProtectedRoute>} />
          <Route path="/admin/seo" element={<ProtectedRoute roles={['admin']}><AdminSEO /></ProtectedRoute>} />
          <Route path="/admin/hero" element={<ProtectedRoute roles={['admin']}><AdminHero /></ProtectedRoute>} />
          <Route path="/admin/about" element={<ProtectedRoute roles={['admin']}><AdminAbout /></ProtectedRoute>} />
          <Route path="/admin/features" element={<ProtectedRoute roles={['admin']}><AdminFeatures /></ProtectedRoute>} />
          <Route path="/admin/team" element={<ProtectedRoute roles={['admin']}><AdminTeam /></ProtectedRoute>} />
          <Route path="/admin/contact-info" element={<ProtectedRoute roles={['admin']}><AdminContactInfo /></ProtectedRoute>} />
          <Route path="/admin/site-settings" element={<ProtectedRoute roles={['admin']}><AdminSiteSettings /></ProtectedRoute>} />
          <Route path="/admin/coupons" element={<ProtectedRoute roles={['admin']}><AdminCoupons /></ProtectedRoute>} />
          <Route path="/admin/roles" element={<ProtectedRoute roles={['admin']}><AdminRoles /></ProtectedRoute>} />
        </Routes>
      </main>
      
      <Footer />
      
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
  );
}

export default App;
