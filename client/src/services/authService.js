// SheetDB Authentication - No backend needed!
import * as auth from './authSheetDB';

const authService = {
  // Register new user
  register: async (userData) => {
    const result = await auth.register(userData.name, userData.email, userData.password);
    // Format response to match expected structure
    return {
      data: {
        user: result.user,
        token: result.token
      },
      success: result.success
    };
  },

  // Login user
  login: async (credentials) => {
    console.log('AuthService: Attempting login with:', { email: credentials.email });
    try {
      const result = await auth.login(credentials.email, credentials.password);
      console.log('AuthService: Login response:', result);
      // Format response to match expected structure
      return {
        data: {
          user: result.user,
          token: result.token
        },
        success: result.success
      };
    } catch (error) {
      console.error('AuthService: Login error:', error.message || error);
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    auth.logout();
  },

  // Get current user
  getCurrentUser: async () => {
    const user = auth.getCurrentUser();
    return { data: user, success: !!user };
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return auth.isAuthenticated();
  },
};

export default authService;
