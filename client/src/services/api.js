// SheetDB API - No backend needed!
import * as sheetdb from './sheetdb';

// Compatibility layer for existing code using axios-style API
const api = {
  get: async (url, config = {}) => {
    try {
      const parts = url.replace('/api/', '').split('/').filter(Boolean);
      
      // Menu endpoints
      if (parts[0] === 'menu') {
        if (parts[1] === 'categories' && parts[2] === 'list') {
          const items = await sheetdb.getMenuItems();
          const uniqueCategories = [...new Set(items.map(item => item.category))];
          return { data: { data: uniqueCategories.map(cat => ({ category: cat })) } };
        }
        const items = await sheetdb.getMenuItems();
        // Apply category filter if provided
        const category = config.params?.category;
        const filtered = category ? items.filter(item => item.category === category) : items;
        return { data: { data: { items: filtered } } };
      }
      
      if (parts[0] === 'orders') return { data: { data: await sheetdb.getOrders() } };
      if (parts[0] === 'reservations') return { data: { data: await sheetdb.getReservations() } };
      if (parts[0] === 'admin' && parts[1] === 'reservations') return { data: { data: await sheetdb.getReservations() } };
      if (parts[0] === 'coupons') return { data: { data: await sheetdb.getCoupons() } };
      if (parts[0] === 'gallery') return { data: { data: await sheetdb.getGalleryItems() } };
      if (parts[0] === 'reviews') return { data: { data: await sheetdb.getReviews() } };
      if (parts[0] === 'users') return { data: await sheetdb.getUsers() };
      if (parts[0] === 'features') return { data: await sheetdb.getFeatures() };
      if (parts[0] === 'team') return { data: await sheetdb.getTeamMembers() };
      if (parts[0] === 'hero') return { data: await sheetdb.getHeroSection() };
      if (parts[0] === 'about') return { data: await sheetdb.getAboutSection() };
      if (parts[0] === 'contact-info') return { data: await sheetdb.getContactInfo() };
      if (parts[0] === 'site-settings') return { data: await sheetdb.getSiteSettings() };
      if (parts[0] === 'seo') return { data: await sheetdb.getSEO() };
      
      return { data: { data: [] } };
    } catch (error) {
      console.error('API GET Error:', url, error);
      throw error;
    }
  },
  
  post: async (url, data) => {
    try {
      const parts = url.replace('/api/', '').split('/').filter(Boolean);
      
      if (parts[0] === 'menu') return { data: { data: await sheetdb.createMenuItem(data) } };
      if (parts[0] === 'orders') return { data: { data: await sheetdb.createOrder(data) } };
      if (parts[0] === 'reservations') return { data: { data: await sheetdb.createReservation(data) } };
      if (parts[0] === 'coupons') {
        if (parts[1] === 'validate') return { data: { data: await sheetdb.validateCoupon(data.code) } };
        return { data: { data: await sheetdb.createCoupon(data) } };
      }
      if (parts[0] === 'gallery') return { data: { data: await sheetdb.createGalleryItem(data) } };
      if (parts[0] === 'reviews') return { data: { data: await sheetdb.createReview(data) } };
      if (parts[0] === 'features') return { data: { data: await sheetdb.createFeature(data) } };
      if (parts[0] === 'team') return { data: { data: await sheetdb.createTeamMember(data) } };
      
      return { data: { data: {} } };
    } catch (error) {
      console.error('API POST Error:', url, error);
      throw error;
    }
  },
  
  put: async (url, data) => {
    try {
      const parts = url.replace('/api/', '').split('/').filter(Boolean);
      const id = parts[parts.length - 1];
      
      if (parts[0] === 'menu') return { data: { data: await sheetdb.updateMenuItem(id, data) } };
      if (parts[0] === 'orders') return { data: { data: await sheetdb.updateOrder(id, data) } };
      if (parts[0] === 'reservations') return { data: { data: await sheetdb.updateReservation(id, data) } };
      if (parts[0] === 'admin' && parts[1] === 'reservations' && parts[3] === 'status') {
        return { data: { data: await sheetdb.updateReservation(parts[2], data) } };
      }
      if (parts[0] === 'coupons') return { data: { data: await sheetdb.updateCoupon(id, data) } };
      if (parts[0] === 'gallery') return { data: { data: await sheetdb.updateGalleryItem(id, data) } };
      if (parts[0] === 'reviews') return { data: { data: await sheetdb.updateReview(id, data) } };
      if (parts[0] === 'users') return { data: await sheetdb.updateUser(id, data) };
      if (parts[0] === 'features') return { data: { data: await sheetdb.updateFeature(id, data) } };
      if (parts[0] === 'team') return { data: { data: await sheetdb.updateTeamMember(id, data) } };
      if (parts[0] === 'hero') return { data: { data: await sheetdb.updateHeroSection(id, data) } };
      if (parts[0] === 'about') return { data: { data: await sheetdb.updateAboutSection(id, data) } };
      if (parts[0] === 'contact-info') return { data: { data: await sheetdb.updateContactInfo(id, data) } };
      if (parts[0] === 'site-settings') return { data: { data: await sheetdb.updateSiteSettings(id, data) } };
      if (parts[0] === 'seo') return { data: { data: await sheetdb.updateSEO(id, data) } };
      
      return { data: { data: {} } };
    } catch (error) {
      console.error('API PUT Error:', url, error);
      throw error;
    }
  },
  
  patch: async (url, data) => {
    try {
      const parts = url.replace('/api/', '').split('/').filter(Boolean);
      const id = parts[parts.length - 2] || parts[parts.length - 1];
      
      // Handle special toggle endpoints
      if (parts[0] === 'coupons' && parts[2] === 'toggle') {
        return { data: { data: await sheetdb.toggleCouponStatus(id) } };
      }
      if (parts[0] === 'menu' && parts[2] === 'toggle') {
        return { data: { data: await sheetdb.toggleMenuItemAvailability(id) } };
      }
      
      return api.put(url, data);
    } catch (error) {
      console.error('API PATCH Error:', url, error);
      throw error;
    }
  },
  
  delete: async (url) => {
    try {
      const parts = url.replace('/api/', '').split('/').filter(Boolean);
      const id = parts[parts.length - 1];
      
      if (parts[0] === 'menu') return { data: { data: await sheetdb.deleteMenuItem(id) } };
      if (parts[0] === 'coupons') return { data: { data: await sheetdb.deleteCoupon(id) } };
      if (parts[0] === 'gallery') return { data: { data: await sheetdb.deleteGalleryItem(id) } };
      if (parts[0] === 'reviews') return { data: { data: await sheetdb.deleteReview(id) } };
      if (parts[0] === 'users') return { data: await sheetdb.deleteUser(id) };
      if (parts[0] === 'features') return { data: { data: await sheetdb.deleteFeature(id) } };
      if (parts[0] === 'team') return { data: { data: await sheetdb.deleteTeamMember(id) } };
      
      return { data: { data: {} } };
    } catch (error) {
      console.error('API DELETE Error:', url, error);
      throw error;
    }
  }
};

export default api;
