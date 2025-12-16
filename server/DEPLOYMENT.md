# 🚀 DEPLOYMENT GUIDE - MongoDB Setup

## Current Status
- ✅ Application is working with **localStorage** (sample data)
- ✅ No database required for local development
- ✅ All features are functional

---

## 📝 When You're Ready to Deploy with MongoDB

### Step 1: Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (free tier available)
4. Click **"Connect"** button on your cluster
5. Select **"Connect your application"**
6. Copy the connection string

**Example connection string:**
```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/lumiere-cafe?retryWrites=true&w=majority
```

---

### Step 2: Add Connection String

Open the file: **`server/config/database.config.js`**

Find this line:
```javascript
// MONGODB_URI: 'your_mongodb_connection_string_here',
```

**Uncomment it and add your connection string:**
```javascript
MONGODB_URI: 'mongodb+srv://username:password@cluster0.abc123.mongodb.net/lumiere-cafe?retryWrites=true&w=majority',
```

---

### Step 3: Restart Server

```bash
cd server
npm run dev
```

**That's it! ✅**

Your application will now:
- ✅ Automatically connect to MongoDB
- ✅ Store all data in the database
- ✅ Work exactly the same way (no code changes needed)
- ✅ All existing features continue to work

---

## 🔒 Security Tips

### For Development:
- Keep `database.config.js` as is (commented out)
- Use sample data with localStorage

### For Production:
- Use environment variables instead of hardcoding
- Add `database.config.js` to `.gitignore`
- Never commit real credentials to GitHub

### Using Environment Variables (Recommended for Production):
Instead of editing `database.config.js`, set environment variable:

```bash
# Linux/Mac
export MONGODB_URI='your_connection_string'

# Windows CMD
set MONGODB_URI=your_connection_string

# Windows PowerShell
$env:MONGODB_URI='your_connection_string'
```

Or create `.env` file in server directory:
```
MONGODB_URI=your_mongodb_connection_string
```

---

## 📊 Database Collections

Once connected, MongoDB will automatically create these collections:
- users
- menuitems
- orders
- reservations
- reviews
- gallery
- herosections
- features
- teammembers
- aboutsections
- contactinfos
- sitesettings
- todaysoffers

---

## ❓ Troubleshooting

**Can't connect to MongoDB?**
- Check your connection string is correct
- Verify your MongoDB Atlas cluster is running
- Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for testing)
- Ensure your password doesn't contain special characters

**Want to go back to localStorage?**
- Simply comment out the MONGODB_URI line in `database.config.js`
- Restart the server

---

## 📞 Support

Need help? Check:
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/
- Mongoose Documentation: https://mongoosejs.com/docs/

---

**Remember:** No code changes are needed! Just add your MongoDB connection string and restart the server. Everything else works automatically! 🎉
