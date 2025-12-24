# 🚀 Quick Start Guide - Lumière Café

Get up and running in 5 minutes!

---

## ⚡ Fastest Way to Deploy (Static - No Backend)

Perfect for: **Demos, Templates, Selling on marketplaces**

### 1️⃣ Build

```bash
cd client
npm install
npm run build
```

### 2️⃣ Deploy

Drag the `client/build` folder to:
- [**Netlify Drop**](https://app.netlify.com/drop) ← Easiest!
- [**Vercel**](https://vercel.com/new)
- [**Surge**](https://surge.sh/)

### 3️⃣ Done! ✅

Your site is live with:
- ✅ Clean empty template
- ✅ Admin login: `admin@admin.com` / `admin`
- ✅ Demo login: `demo@demo.com` / `demo`
- ✅ All features work via localStorage
- ✅ No database needed!

---

## 🐳 Full Stack with Docker

Perfect for: **Production with database**

### 1️⃣ Setup

```bash
# Clone and install
git clone <your-repo>
cd lumiere-cafe
cp .env.example .env
```

### 2️⃣ Run

```bash
docker-compose up -d
```

### 3️⃣ Access

Open `http://localhost:5000`

---

## 💻 Local Development

### 1️⃣ Install

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

Or manually:
```bash
npm run install:all
```

### 2️⃣ Run

```bash
npm run dev
```

### 3️⃣ Open

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

---

## 🔐 Login Credentials

### Admin (Full Access)
- **Email/Username:** `admin@admin.com` or `admin`
- **Password:** `admin`
- Can manage everything

### Demo (Customer)
- **Email/Username:** `demo@demo.com` or `demo`
- **Password:** `demo`
- Read-only customer access

These are hardcoded and always work! 🔒

---

## 📂 What's Inside?

### For Buyers/Users:
- ✨ **Clean empty template** - no sample data cluttering
- 🎨 **Professional UK café design** - Warm amber colors
- 📱 **Fully responsive** - Works on all devices
- 🌙 **Dark mode** - Toggle light/dark themes
- 🛡️ **Admin panel** - Complete CMS for content management
- 🔐 **Authentication** - Secure login system
- 💾 **localStorage** - Works without backend
- 🚀 **Fast** - Optimized for performance

### For Developers:
- ⚛️ React 18 + TailwindCSS 3
- 🎯 TypeScript-ready structure
- 📦 Easy to customize
- 🔌 API-ready (can connect to any backend)
- 🐳 Docker support
- 📝 Well documented
- ✅ Production-ready

---

## 🎯 Next Steps

1. **Customize branding**
   - Edit colors in `tailwind.config.js`
   - Replace logo and favicon
   - Update site title and description

2. **Add content via Admin Panel**
   - Login as admin
   - Add menu items
   - Upload gallery images
   - Add team members
   - Configure settings

3. **Deploy**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guides
   - Choose platform: Netlify, Vercel, Docker, or VPS

4. **Go Live!** 🎉

---

## 🆘 Need Help?

### Common Issues

**Port 3000/5000 in use:**
```bash
# Kill the process
npx kill-port 3000
npx kill-port 5000
```

**Build fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
rm -rf client/node_modules client/package-lock.json
npm run install:all
```

**Data not saving:**
- Make sure localStorage is enabled in browser
- Check browser console for errors
- Try incognito mode to test

### Documentation
- 📖 [README.md](README.md) - Full documentation
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guides
- ✅ [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) - Pre-launch checklist
- 🔐 [show-admin.html](client/public/show-admin.html) - Credentials reference

---

## ⭐ Features Highlight

| Feature | Status | Notes |
|---------|--------|-------|
| Frontend | ✅ Ready | React + TailwindCSS |
| Admin Panel | ✅ Ready | Full CMS included |
| Authentication | ✅ Ready | Hardcoded logins |
| Menu Management | ✅ Ready | CRUD operations |
| Order System | ✅ Ready | Track orders |
| Reservations | ✅ Ready | Table booking |
| Gallery | ✅ Ready | Image management |
| Reviews | ✅ Ready | Customer feedback |
| Dark Mode | ✅ Ready | Theme toggle |
| Responsive | ✅ Ready | Mobile-first |
| SEO | ✅ Ready | Meta tags configurable |
| localStorage | ✅ Ready | No backend needed |
| MongoDB | ✅ Optional | Easy to add |
| Docker | ✅ Ready | Full stack container |

---

## 🎨 Customization Quick Tips

### Change Colors
Edit `client/tailwind.config.js`:
```js
colors: {
  primary: colors.amber,  // Change to your brand color
  accent: colors.orange,  // Change accent color
}
```

### Change Fonts
Edit `client/tailwind.config.js`:
```js
fontFamily: {
  serif: ['Your Serif Font', ...defaultTheme.fontFamily.serif],
  sans: ['Your Sans Font', ...defaultTheme.fontFamily.sans],
}
```

### Add Your Logo
Replace:
- `client/public/favicon.ico`
- `client/public/logo192.png`
- `client/public/logo512.png`

Update logo in components:
- `client/src/components/layout/Navbar.js`
- `client/src/components/layout/Footer.js`

---

## 📞 Support

**Need help with deployment?**
- Check [DEPLOYMENT.md](DEPLOYMENT.md)
- Review [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)
- Check console for error messages

**Want to add features?**
- All code is modular and well-documented
- Service layer makes it easy to swap localStorage for API
- Component-based architecture for easy customization

---

**🎉 Enjoy your new café website!**

Made with ❤️ for café owners and template buyers
