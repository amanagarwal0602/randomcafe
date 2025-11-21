# Lumière Café - Frontend Only (No Backend Required!)

## 🚀 **Complete Setup - SheetDB API**

Your entire application now runs **frontend-only** using SheetDB as the database!

### **1. Install Dependencies**

```bash
cd client
npm install
```

### **2. Seed SheetDB Database**

```bash
cd src/scripts
npm install
node seedSheetDB.js
```

This will populate your SheetDB with:
- ✅ Admin user (admin@lumierecafe.com / Admin@123)
- ✅ 8 Menu items
- ✅ 3 Gallery images
- ✅ Hero section
- ✅ 4 Features
- ✅ 4 Sample coupons (WELCOME10, SAVE20, SUMMER25, FREESHIP)

### **3. Run the Application**

```bash
cd ../..  # Back to client folder
npm start
```

The app will open at `http://localhost:3000`

---

## 📋 **What Changed?**

### **Before (With Backend)**
- Node.js Express server required
- MongoDB database required
- Two servers running (frontend:3000, backend:5000)
- Complex authentication with JWT

### **After (Frontend Only)**
- ✅ No backend server needed
- ✅ No MongoDB needed  
- ✅ Only React app runs (port 3000)
- ✅ SheetDB API handles all data
- ✅ Client-side authentication

---

## 🔑 **Login Credentials**

**Admin Account:**
- Email: `admin@lumierecafe.com`
- Password: `Admin@123`

---

## 🎟️ **Sample Coupons**

- `WELCOME10` - 10% off first order ($20 minimum)
- `SAVE20` - $20 off orders above $100
- `SUMMER25` - 25% off (max $50 discount, $50 minimum)
- `FREESHIP` - $5 off delivery fee ($30 minimum)

---

## 📁 **Key Files**

### **Modified Files:**
1. `client/src/services/api.js` - Now uses SheetDB instead of backend
2. `client/src/services/authService.js` - Client-side authentication
3. Added `client/src/services/sheetdb.js` - All SheetDB operations
4. Added `client/src/services/authSheetDB.js` - SheetDB authentication
5. Added `client/src/scripts/seedSheetDB.js` - Database seeding script

### **SheetDB API Endpoint:**
```
https://sheetdb.io/api/v1/qfa6hx74jtnim
```

---

## 🎯 **Features Working**

✅ User authentication (login/register/logout)  
✅ Menu items management  
✅ Orders management  
✅ Reservations management  
✅ Coupon codes system  
✅ Gallery management  
✅ Reviews system  
✅ CMS (Hero, About, Features, Team)  
✅ Contact info management  
✅ Site settings  
✅ SEO management  

---

## 🔧 **Troubleshooting**

### **If login doesn't work:**
1. Make sure you ran the seed script: `node seedSheetDB.js`
2. Check SheetDB has data at: https://sheetdb.io/console
3. Clear browser localStorage and try again

### **If data doesn't show:**
1. Open browser console (F12)
2. Check for errors
3. Verify SheetDB API is responding
4. Re-run seed script if needed

---

## 📦 **Deployment**

### **Deploy to Netlify/Vercel (Frontend Only):**

```bash
cd client
npm run build
```

Upload the `build` folder to:
- Netlify: Drag & drop
- Vercel: Connect GitHub repo
- GitHub Pages: Push to gh-pages branch

**No backend deployment needed!** 🎉

---

## 💡 **How It Works**

```
Browser → React App → SheetDB API → Google Sheets
```

1. All data stored in Google Sheets via SheetDB
2. Authentication done client-side with bcryptjs
3. Tokens stored in localStorage
4. No server needed - pure JAMstack architecture!

---

## 🎨 **Admin Features**

Login as admin to access:
- Dashboard (`/admin`)
- Orders Management
- Reservations Management  
- Menu Management
- Gallery Management
- User Management
- Reviews Management
- Coupons Management
- CMS Content (Hero, About, Features, Team)
- Contact Info
- Site Settings
- SEO Settings

---

## 📞 **Support**

If you encounter issues:
1. Check browser console for errors
2. Verify SheetDB API key is correct
3. Ensure all dependencies are installed
4. Clear browser cache and localStorage

---

**🎉 Enjoy your serverless café management system!**
