// localStorage Authentication Service
import * as db from './localStorage';

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      // Check if username already exists
      if (userData.username) {
        const users = await db.getUsers();
        const usernameExists = users.some(u => u.username === userData.username);
        if (usernameExists) {
          throw new Error('Username already taken');
        }
      }

      // Check if email already exists
      const users = await db.getUsers();
      const emailExists = users.some(u => u.email === userData.email);
      if (emailExists) {
        throw new Error('Email already registered');
      }

      // Create new user
      const newUser = await db.createUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        username: userData.username || '',
        role: 'customer'
      });

      // Create token
      const token = btoa(JSON.stringify({ userId: newUser.id, email: newUser.email }));
      localStorage.setItem('accessToken', token);

      return {
        data: {
          user: newUser,
          token: token
        },
        success: true
      };
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    console.log('AuthService: Attempting login with:', { emailOrUsername: credentials.email });
    try {
      const users = await db.getUsers();
      
      // Find user by email or username (case-insensitive)
      const loginInput = credentials.email.toLowerCase().trim();
      const user = users.find(u => 
        u.email.toLowerCase() === loginInput || 
        (u.username && u.username.toLowerCase() === loginInput)
      );

      if (!user) {
        throw new Error('Invalid credentials');
      }

      if (user.password !== credentials.password) {
        throw new Error('Invalid credentials');
      }

      if (!user.is_active) {
        throw new Error('Account is inactive');
      }

      // Create token
      const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(user)); // Store user data for EditMode

      console.log('AuthService: Login successful, user stored:', user.name, user.role);
      return {
        data: {
          user: user,
          token: token
        },
        success: true
      };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user'); // Also remove user data
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return { data: null, success: false };

      const payload = JSON.parse(atob(token));
      const users = await db.getUsers();
      const user = users.find(u => u.id === payload.userId);
      
      return { data: user, success: !!user };
    } catch (error) {
      console.error('Get current user failed:', error);
      return { data: null, success: false };
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },
};

export default authService;
