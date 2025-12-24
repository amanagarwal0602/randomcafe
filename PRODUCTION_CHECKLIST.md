# 🚀 Production Deployment Checklist

Use this checklist before deploying to production.

---

## ✅ Pre-Deployment Checklist

### 🔐 Security

- [ ] Change all default passwords
- [ ] Generate strong JWT secrets (32+ characters)
- [ ] Set `NODE_ENV=production` in environment
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure CORS for specific domain (not `*`)
- [ ] Review and update rate limiting settings
- [ ] Remove console.log statements from production code
- [ ] Enable security headers (helmet.js configured)
- [ ] Set up environment variables properly
- [ ] Add `.env` to `.gitignore` (already configured)
- [ ] Never commit sensitive credentials to Git

### 📝 Configuration

- [ ] Update `CLIENT_URL` in `.env`
- [ ] Configure MongoDB connection string (or use localStorage)
- [ ] Set correct `PORT` in environment
- [ ] Configure file upload limits
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Configure analytics (Google Analytics, Plausible)
- [ ] Set up backup strategy for data
- [ ] Configure email service (if using notifications)
- [ ] Review upload file size limits

### 🏗️ Build & Testing

- [ ] Run `npm run build` successfully
- [ ] Test production build locally
- [ ] Verify all routes work correctly
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Check responsive design on all screen sizes
- [ ] Verify all images load correctly
- [ ] Test forms and validation
- [ ] Verify localStorage functionality
- [ ] Test admin panel features
- [ ] Test customer portal features
- [ ] Check for console errors
- [ ] Run Lighthouse audit (aim for 90+ scores)

### 🎨 Content & Branding

- [ ] Update site title and description
- [ ] Replace favicon with custom icon
- [ ] Update meta tags for SEO
- [ ] Add custom logo and branding
- [ ] Update footer information
- [ ] Add custom domain (if applicable)
- [ ] Configure social media links
- [ ] Set up Open Graph tags for social sharing
- [ ] Add privacy policy page
- [ ] Add terms of service page
- [ ] Update contact information

### 📊 Performance

- [ ] Minify CSS and JavaScript (auto in build)
- [ ] Optimize images (compress, resize)
- [ ] Enable gzip compression (configured)
- [ ] Configure caching headers
- [ ] Test page load speed (<3 seconds)
- [ ] Implement lazy loading for images
- [ ] Reduce bundle size if needed
- [ ] Configure CDN (optional)
- [ ] Test under slow network conditions

### 🗄️ Database (If Using MongoDB)

- [ ] Set up MongoDB Atlas cluster
- [ ] Configure database backups
- [ ] Set up database monitoring
- [ ] Whitelist appropriate IP addresses
- [ ] Create database indexes for performance
- [ ] Test database connection
- [ ] Seed initial data if needed
- [ ] Set up read replicas (optional)

### 🐳 Docker (If Using Docker)

- [ ] Test Docker build locally
- [ ] Verify docker-compose.yml configuration
- [ ] Test container startup
- [ ] Check volume mounts for uploads
- [ ] Verify MongoDB container connection
- [ ] Test container restart policies
- [ ] Configure container logs

---

## 🚀 Deployment Steps

### For Static Hosting (Netlify/Vercel)

1. [ ] Run `cd client && npm run build`
2. [ ] Test build folder locally
3. [ ] Deploy to hosting platform
4. [ ] Configure custom domain
5. [ ] Set up SSL certificate
6. [ ] Test deployed site
7. [ ] Check all routes work with SPA routing
8. [ ] Verify redirects are configured

### For Heroku

1. [ ] Create Heroku app
2. [ ] Set environment variables in Heroku
3. [ ] Connect GitHub repository (optional)
4. [ ] Configure buildpacks if needed
5. [ ] Deploy via Git push or CLI
6. [ ] Check Heroku logs for errors
7. [ ] Test deployed application
8. [ ] Set up custom domain

### For VPS (DigitalOcean/AWS)

1. [ ] SSH into server
2. [ ] Install Node.js and dependencies
3. [ ] Clone repository
4. [ ] Install project dependencies
5. [ ] Build frontend
6. [ ] Set up PM2 for process management
7. [ ] Configure Nginx as reverse proxy
8. [ ] Set up SSL with Let's Encrypt
9. [ ] Configure firewall rules
10. [ ] Set up monitoring and alerts
11. [ ] Test deployed application

### For Docker

1. [ ] Build Docker image
2. [ ] Test container locally
3. [ ] Push to container registry (optional)
4. [ ] Deploy to production server
5. [ ] Start with docker-compose
6. [ ] Check container logs
7. [ ] Verify volumes are mounted
8. [ ] Test application functionality

---

## 📱 Post-Deployment Testing

### Functional Testing

- [ ] **Homepage**: Loads correctly, all sections visible
- [ ] **Menu**: All categories display, filters work
- [ ] **About**: Content loads, images visible
- [ ] **Gallery**: Images load, lightbox works
- [ ] **Contact**: Form submits, map displays
- [ ] **Reservation**: Booking form works
- [ ] **Login**: Admin and demo logins work
- [ ] **Register**: New user registration works
- [ ] **Admin Panel**: All sections accessible
- [ ] **Menu Management**: CRUD operations work
- [ ] **Order Management**: Can view and update orders
- [ ] **User Management**: Can manage users
- [ ] **Gallery Management**: Image upload works
- [ ] **Settings**: Can update site settings
- [ ] **Dark Mode**: Toggle works correctly
- [ ] **Responsive**: Mobile and tablet views work

### Performance Testing

- [ ] Page load time < 3 seconds
- [ ] Time to Interactive < 5 seconds
- [ ] First Contentful Paint < 2 seconds
- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse Accessibility score > 90
- [ ] Lighthouse Best Practices score > 90
- [ ] Lighthouse SEO score > 90

### Security Testing

- [ ] HTTPS enabled and working
- [ ] No mixed content warnings
- [ ] Security headers present
- [ ] Rate limiting active
- [ ] CORS properly configured
- [ ] No sensitive data in client code
- [ ] No API keys exposed
- [ ] XSS protection enabled
- [ ] CSRF protection in place

---

## 🔧 Monitoring & Maintenance

### Set Up Monitoring

- [ ] Configure uptime monitoring (UptimeRobot, Pingdom)
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics (Google Analytics, Plausible)
- [ ] Set up server monitoring (New Relic, Datadog)
- [ ] Configure log aggregation
- [ ] Set up alerts for downtime
- [ ] Monitor database performance
- [ ] Track API response times

### Regular Maintenance

- [ ] Schedule regular backups
- [ ] Update dependencies monthly
- [ ] Review security vulnerabilities
- [ ] Monitor disk space usage
- [ ] Check server logs weekly
- [ ] Review error reports
- [ ] Update SSL certificates (auto with Let's Encrypt)
- [ ] Test backup restoration
- [ ] Review user feedback
- [ ] Update content regularly

---

## 📞 Emergency Contacts & Resources

### Documentation
- Project README: `/README.md`
- Deployment Guide: `/DEPLOYMENT.md`
- Admin Credentials: `/show-admin.html`

### Important Commands
```bash
# Restart application (PM2)
pm2 restart lumiere-cafe

# Check logs
pm2 logs lumiere-cafe

# Restart Nginx
sudo systemctl restart nginx

# Check Docker containers
docker-compose ps
docker-compose logs -f

# Database backup (MongoDB)
mongodump --uri="mongodb://..." --out=/backup/
```

### Rollback Plan
1. Keep previous Git commit tagged
2. Keep previous Docker image
3. Have database backup ready
4. Document rollback procedure

---

## ✅ Final Sign-Off

### Before Going Live

- [ ] All checklist items completed
- [ ] Stakeholder approval received
- [ ] Backup plan in place
- [ ] Rollback procedure tested
- [ ] Support team briefed
- [ ] Documentation updated
- [ ] Monitoring configured
- [ ] Success metrics defined

### Deployment Date: _______________
### Deployed By: _______________
### Version: _______________

---

## 🎉 Go Live!

After completing all checks:

1. ✅ Announce deployment to team
2. ✅ Monitor closely for first 24 hours
3. ✅ Check error logs regularly
4. ✅ Gather user feedback
5. ✅ Document any issues
6. ✅ Celebrate success! 🎊

---

**Made with ❤️ for smooth deployments**
