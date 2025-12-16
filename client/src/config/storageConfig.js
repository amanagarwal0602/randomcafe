/**
 * Storage Configuration
 * Controls whether the app uses localStorage (development) or MongoDB (production)
 */

const storageConfig = {
  // Set to 'localStorage' for development or 'mongodb' for production
  mode: 'localStorage', // Change to 'mongodb' when deploying
  
  // MongoDB connection string - only used when mode is 'mongodb'
  // Format: mongodb+srv://username:password@cluster.mongodb.net/dbname
  mongodbUri: '',
  
  // API Base URL
  apiBaseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
};

/**
 * Get the current storage mode
 * @returns {'localStorage' | 'mongodb'}
 */
export const getStorageMode = () => {
  return storageConfig.mode;
};

/**
 * Check if using localStorage
 * @returns {boolean}
 */
export const isLocalStorage = () => {
  return storageConfig.mode === 'localStorage';
};

/**
 * Check if using MongoDB
 * @returns {boolean}
 */
export const isMongoDB = () => {
  return storageConfig.mode === 'mongodb';
};

/**
 * Get MongoDB URI
 * @returns {string}
 */
export const getMongoDBUri = () => {
  return storageConfig.mongodbUri;
};

/**
 * Get API Base URL
 * @returns {string}
 */
export const getApiBaseUrl = () => {
  return storageConfig.apiBaseUrl;
};

/**
 * Update storage configuration
 * @param {Object} newConfig
 */
export const updateStorageConfig = (newConfig) => {
  Object.assign(storageConfig, newConfig);
};

export default storageConfig;
