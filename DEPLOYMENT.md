# 🚀 Deployment Guide - Lumière Café

Complete deployment guide for various platforms. Choose the deployment method that best suits your needs.

---

## 📋 Table of Contents

1. [Quick Start (localStorage only)](#quick-start-localstorage-only)
2. [Deploy to Netlify](#deploy-to-netlify)
3. [Deploy to Vercel](#deploy-to-vercel)
4. [Deploy with Docker](#deploy-with-docker)
5. [Deploy to Heroku](#deploy-to-heroku)
6. [Deploy to VPS (DigitalOcean/AWS)](#deploy-to-vps)
7. [Environment Variables](#environment-variables)
8. [MongoDB Setup](#mongodb-setup)

---

## 🎯 Quick Start (localStorage only)

**Perfect for:** Templates, demos, MVP testing
**No backend required!** The app uses browser localStorage for data storage.

### Steps:

1. **Install Dependencies**
```bash
cd client
npm install
```

2. **Build for Production**
```bash
npm run build
```

3. **Deploy the `build` folder** to any static hosting:
   - Netlify Drop
   - Vercel
   - GitHub Pages
   - Firebase Hosting
   - Surge.sh

**That's it!** The app works completely client-side with hardcoded admin/demo logins.

---

## 🌐 Deploy to Netlify

**Best for:** Static sites, JAMstack, free tier available

### Method 1: Drag & Drop (Easiest)

1. Build the project:
```bash
cd client
npm run build
```

2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `client/build` folder
4. Done! ✅

### Method 2: CLI Deployment

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy:
```bash
cd client
npm run build
netlify deploy --prod --dir=build
```

### Method 3: Git Integration

1. Push code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/build`
6. Click "Deploy site"

---

## ⚡ Deploy to Vercel

**Best for:** Next.js, React apps, serverless functions

### Method 1: CLI Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd client
vercel --prod
```

### Method 2: Git Integration

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
5. Click "Deploy"

---

## 🐳 Deploy with Docker

**Best for:** Full-stack with MongoDB, containerized deployment

### Prerequisites:
- Docker installed
- Docker Compose installed

### Steps:

1. **Create `.env` file** in root:
```bash
cp .env.example .env
```

2. **Edit `.env`** with your MongoDB URI (or use Docker MongoDB):
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/lumiere-cafe
```

3. **Build and Run**:
```bash
# Build the image
docker-compose build

# Start all services (app + MongoDB)
docker-compose up -d

# Check logs
docker-compose logs -f
```

4. **Access the app**:
   - Frontend: `http://localhost:5000`
   - API: `http://localhost:5000/api/health`

5. **Stop services**:
```bash
docker-compose down
```

### Custom Docker Build:

```bash
# Build image
docker build -t lumiere-cafe .

# Run container
docker run -d -p 5000:5000 \
  -e NODE_ENV=production \
  -e MONGODB_URI=your_mongodb_uri \
  lumiere-cafe
```

---

## 🟣 Deploy to Heroku

**Best for:** Full-stack with backend, free tier available

### Prerequisites:
- Heroku account
- Heroku CLI installed

### Steps:

1. **Login to Heroku**:
```bash
heroku login
```

2. **Create Heroku app**:
```bash
heroku create your-cafe-name
```

3. **Add MongoDB** (using MongoDB Atlas):
```bash
# Set MongoDB URI
heroku config:set MONGODB_URI=your_mongodb_atlas_uri

# Set other environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_key_here
```

4. **Deploy**:
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

5. **Open app**:
```bash
heroku open
```

### Heroku Configuration Files:

Create `Procfile` in root:
```
web: cd server && npm start
```

The `heroku-postbuild` script in package.json will automatically build the client.

---

## 🖥️ Deploy to VPS (DigitalOcean/AWS/Linode)

**Best for:** Full control, custom domain, production apps

### Prerequisites:
- Ubuntu 20.04+ VPS
- Domain name (optional)
- SSH access

### Steps:

1. **SSH into your server**:
```bash
ssh root@your-server-ip
```

2. **Install Node.js**:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install MongoDB** (or use MongoDB Atlas):
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

4. **Clone your repository**:
```bash
cd /var/www
git clone https://github.com/yourusername/lumiere-cafe.git
cd lumiere-cafe
```

5. **Install dependencies**:
```bash
npm run install:all
```

6. **Create `.env` file**:
```bash
cp .env.example .env
nano .env
```

Edit with your production settings.

7. **Build the frontend**:
```bash
cd client
npm run build
cd ..
```

8. **Install PM2** (process manager):
```bash
sudo npm install -g pm2
```

9. **Start the server**:
```bash
cd server
pm2 start server.js --name lumiere-cafe
pm2 startup
pm2 save
```

10. **Setup Nginx** (reverse proxy):
```bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/lumiere-cafe
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/lumiere-cafe /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

11. **Setup SSL** (Let's Encrypt):
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Application
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/lumiere-cafe

# JWT (CHANGE THESE!)
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Client
CLIENT_URL=https://your-domain.com

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Security Best Practices:
- ✅ Never commit `.env` to Git
- ✅ Use strong, random JWT secrets (32+ characters)
- ✅ Change default admin passwords
- ✅ Use HTTPS in production
- ✅ Enable rate limiting
- ✅ Regularly update dependencies

---

## 🗄️ MongoDB Setup

### Option 1: MongoDB Atlas (Recommended - Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account and login
3. Create a cluster (Free M0 tier)
4. Create database user
5. Whitelist IP (0.0.0.0/0 for all IPs)
6. Get connection string
7. Add to `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lumiere-cafe?retryWrites=true&w=majority
```

### Option 2: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB:
```bash
mongod
```
3. Use local connection:
```env
MONGODB_URI=mongodb://localhost:27017/lumiere-cafe
```

### Option 3: Docker MongoDB

Included in `docker-compose.yml`:
```yaml
mongodb:
  image: mongo:7.0
  ports:
    - "27017:27017"
  volumes:
    - mongo-data:/data/db
```

---

## 🎨 Hardcoded Credentials

The app includes hardcoded logins that work even without database:

### Admin Access:
- **Email/Username:** admin@admin.com or admin
- **Password:** admin
- **Role:** Full admin access

### Demo Customer:
- **Email/Username:** demo@demo.com or demo
- **Password:** demo
- **Role:** Customer access

These are built into the code and always available.

---

## 📱 Post-Deployment Checklist

- [ ] Test admin login
- [ ] Test demo login  
- [ ] Check all pages load correctly
- [ ] Verify mobile responsiveness
- [ ] Test localStorage functionality
- [ ] Check browser console for errors
- [ ] Test image uploads (if using backend)
- [ ] Verify forms work correctly
- [ ] Check menu display
- [ ] Test dark mode toggle
- [ ] Verify production builds are minified
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Configure analytics (Google Analytics)
- [ ] Add custom domain
- [ ] Enable HTTPS/SSL
- [ ] Test performance (Lighthouse)

---

## 🐛 Troubleshooting

### Build Fails:
```bash
# Clear cache
rm -rf node_modules package-lock.json
cd client && rm -rf node_modules package-lock.json
cd ../server && rm -rf node_modules package-lock.json

# Reinstall
npm run install:all
```

### Port Already in Use:
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>
```

### MongoDB Connection Issues:
- Check firewall rules
- Verify connection string
- Check MongoDB Atlas IP whitelist
- Test connection with MongoDB Compass

### Static Files Not Loading:
- Check build path in server.js
- Verify `NODE_ENV=production`
- Check Nginx configuration
- Clear browser cache

---

## 📞 Support

For issues or questions:
- Check documentation
- Review error logs
- Check browser console
- Verify environment variables

---

## 🎉 Success!

Your Lumière Café is now live! 🎊

**Next Steps:**
1. Customize branding and content
2. Add your menu items through admin panel
3. Upload gallery images
4. Configure SEO settings
5. Share with customers!

---

**Made with ❤️ for café owners and template buyers**
