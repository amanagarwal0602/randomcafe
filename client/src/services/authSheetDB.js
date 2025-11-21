import { createUser, getUserByEmail, updateUser } from './sheetdb';

// Simple client-side auth using SheetDB
const AUTH_STORAGE_KEY = 'lumiere_auth';

const isExplicitlyInactive = (value) => {
  if (value === undefined || value === null || value === '') {
    return false;
  }
  if (typeof value === 'boolean') {
    return value === false;
  }
  if (typeof value === 'number') {
    return value === 0;
  }
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (!normalized) return false;
    return ['false', '0', 'inactive', 'no', 'n', 'off'].includes(normalized);
  }
  return false;
};

// Register new user
export const register = async (name, email, password) => {
  try {
    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create user (plain text password for simplicity)
    const userData = {
      name,
      email,
      password: password,
      role: 'customer'
    };

    const result = await createUser(userData);
    
    // Create auth token
    const token = btoa(JSON.stringify({
      id: result.id,
      email: email,
      role: 'customer',
      timestamp: Date.now()
    }));

    // Store auth data
    const authData = {
      token,
      user: {
        id: result.id,
        name: name,
        email: email,
        role: 'customer',
        avatar: '',
        phone: ''
      }
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    
    return {
      success: true,
      message: 'Registration successful',
      token: token,
      user: authData.user
    };
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
};

// Login user
export const login = async (email, password) => {
  try {
    console.log('Login attempt for:', email);
    
    // Get user from SheetDB
    const user = await getUserByEmail(email);
    
    if (!user) {
      console.log('User not found');
      throw new Error('Invalid email or password');
    }

    console.log('User found:', { email: user.email, role: user.role, hasPassword: !!user.password, isActive: user.is_active, type: typeof user.is_active });

    // Verify password (plain text comparison)
    const isValidPassword = password === user.password;
    
    console.log('Password validation result:', isValidPassword);
    
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Treat blank/missing values as active, only block when explicitly inactive
    if (isExplicitlyInactive(user.is_active)) {
      console.log('Account flagged inactive with value:', user.is_active);
      throw new Error('Account is inactive');
    }

    // Create auth token (simple client-side token)
    const token = btoa(JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      timestamp: Date.now()
    }));

    // Store auth data
    const authData = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone
      }
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));

    console.log('Login successful');

    return {
      success: true,
      token,
      user: authData.user
    };
  } catch (error) {
    console.error('Login error:', error.message);
    throw new Error(error.message || 'Login failed');
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  window.location.href = '/login';
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const authData = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!authData) return null;

  try {
    const parsed = JSON.parse(authData);
    return parsed.user;
  } catch {
    return null;
  }
};

// Get auth token
export const getToken = () => {
  const authData = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!authData) return null;

  try {
    const parsed = JSON.parse(authData);
    return parsed.token;
  } catch {
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Check if user has specific role
export const hasRole = (role) => {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
};

// Update user profile
export const updateProfile = async (userId, updates) => {
  try {
    await updateUser(userId, updates);

    // Update localStorage
    const authData = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
    if (authData && authData.user.id === userId) {
      authData.user = { ...authData.user, ...updates };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    }

    return {
      success: true,
      message: 'Profile updated successfully'
    };
  } catch (error) {
    throw new Error(error.message || 'Profile update failed');
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getToken,
  isAuthenticated,
  hasRole,
  updateProfile
};
