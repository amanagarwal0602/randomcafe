/**
 * DATABASE CONFIGURATION
 * 
 * INSTRUCTIONS FOR DEPLOYMENT:
 * 1. Uncomment the MONGODB_URI line below
 * 2. Replace 'your_mongodb_connection_string_here' with your actual MongoDB connection string
 * 3. Save this file
 * 4. Restart the server
 * 
 * MongoDB Connection String Format:
 * mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
 * 
 * Example:
 * mongodb+srv://admin:mypassword@cluster0.abc123.mongodb.net/lumiere-cafe?retryWrites=true&w=majority
 */

module.exports = {
  // ============================================
  // MONGODB CONNECTION STRING
  // ============================================
  // Uncomment the line below and add your MongoDB connection string:
  
  // MONGODB_URI: 'your_mongodb_connection_string_here',
  
  
  // ============================================
  // CURRENT STATUS: USING LOCAL STORAGE (SAMPLE DATA)
  // ============================================
  // The application is currently using localStorage for sample data.
  // No changes needed for local development.
  // 
  // When you're ready to deploy with MongoDB:
  // 1. Uncomment the MONGODB_URI line above
  // 2. Add your MongoDB connection string
  // 3. All data will automatically be stored in MongoDB
  // 4. No other code changes required!
  
  
  // ============================================
  // DATABASE OPTIONS (OPTIONAL CONFIGURATION)
  // ============================================
  options: {
    // Connection pool size (default: 10)
    maxPoolSize: 10,
    
    // Timeout for initial connection (default: 30000ms / 30 seconds)
    serverSelectionTimeoutMS: 30000,
    
    // Timeout for socket operations (default: 45000ms / 45 seconds)
    socketTimeoutMS: 45000,
    
    // Enable auto-reconnection
    autoIndex: true,
  }
};

/**
 * HOW TO GET MONGODB CONNECTION STRING:
 * 
 * 1. Go to https://www.mongodb.com/cloud/atlas
 * 2. Sign up / Log in to MongoDB Atlas
 * 3. Create a new cluster (free tier available)
 * 4. Click "Connect" on your cluster
 * 5. Choose "Connect your application"
 * 6. Copy the connection string
 * 7. Replace <password> with your database user password
 * 8. Replace <database> with your database name (e.g., lumiere-cafe)
 * 9. Paste it in the MONGODB_URI variable above
 * 
 * Security Notes:
 * - Never commit this file with real credentials to GitHub
 * - Add this file to .gitignore if using real credentials
 * - Use environment variables for production deployments
 */
