# Lumière Café - Setup Guide

A premium, full-stack café/restaurant management system with customer portal and admin panel.

## 🚀 Features

### Public Website
- Modern landing page with hero section
- Interactive menu with filtering and search
- About page with team and values
- Photo gallery
- Contact form
- Online table reservations

### Customer Portal
- User authentication (signup/login)
- Profile management
- Order history tracking
- Favorite menu items
- Reservation management
- Shopping cart and checkout

### Admin Panel
- Dashboard with analytics
- Order management with status updates
- Reservation management
- Menu CRUD operations
- Gallery management
- User management
- Review moderation
- SEO settings

## 🛠️ Tech Stack

**Frontend:**
- React 18.2.0
- React Router v6
- TailwindCSS 3.4.0
- Framer Motion 10.16.16
- Axios
- React Toastify

**Backend:**
- Node.js
- Express.js 4.18.2
- MongoDB with Mongoose 8.0.3
- JWT Authentication
- Bcrypt password hashing
- Multer for file uploads
- Express Validator

## 📋 Prerequisites

- Node.js 16+ and npm
- MongoDB 5+ (local or Atlas)
- Git

## 🔧 Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd Extra
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lumiere-cafe
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-refresh-token-secret-change-this
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

**Important:** Change the JWT secrets to strong random strings in production!

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `.env` file in `client` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Database Seeding

Seed the database with initial data (admin user, menu items, etc.):
```bash
cd ../server
npm run seed
```

This creates:
- Admin user: `admin@lumierecafe.com` / `Admin@123`
- Sample menu items
- Gallery images
- SEO settings

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
Frontend runs on http://localhost:3000

### Production with Docker

```bash
docker-compose up --build
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 👤 Default Credentials

After seeding:
- **Admin:** admin@lumierecafe.com / Admin@123
- Create customer accounts via the signup page

## 📁 Project Structure

```
Extra/
├── server/                    # Backend
│   ├── models/               # Mongoose schemas
│   ├── controllers/          # Route handlers
│   ├── routes/               # API routes
│   ├── middleware/           # Auth, validation, upload
│   ├── scripts/              # Database seeding
│   ├── uploads/              # File uploads directory
│   └── server.js             # Entry point
├── client/                   # Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── context/          # Auth and Cart contexts
│   │   ├── pages/            # Page components
│   │   │   ├── public/       # Public pages
│   │   │   ├── auth/         # Login/Register
│   │   │   ├── customer/     # Customer portal
│   │   │   └── admin/        # Admin panel
│   │   ├── services/         # API services
│   │   └── App.js            # Routes
├── API_DOCUMENTATION.md      # Complete API reference
└── docker-compose.yml        # Docker configuration
```

## 🔐 Authentication Flow

1. User registers/logs in
2. Server returns access token (15m expiry) and refresh token (7d expiry)
3. Access token stored in localStorage
4. Axios interceptor adds token to requests
5. On 401 error, refresh token used to get new access token
6. Protected routes check for valid token

## 📡 API Endpoints

See `API_DOCUMENTATION.md` for complete endpoint reference.

**Base URL:** `http://localhost:5000/api`

Key routes:
- `/auth` - Authentication
- `/menu` - Menu items
- `/orders` - Order management
- `/reservations` - Table bookings
- `/gallery` - Photo gallery
- `/reviews` - Customer reviews
- `/users` - User profile
- `/admin` - Admin operations
- `/seo` - SEO settings

## 🎨 Customization

### Theme Colors (TailwindCSS)

Edit `client/tailwind.config.js`:
```js
colors: {
  primary: {
    50: '#FBF9F4',
    500: '#F5F1E8',  // Main beige
    600: '#C9A961',  // Gold accent
  },
  brown: {
    500: '#4A2C2A',  // Dark brown
  }
}
```

### Logo & Branding

Replace logo in `client/src/components/layout/Navbar.js`

### Fonts

Current: Playfair Display (headings), Inter (body)
Change in `client/public/index.html` Google Fonts import

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Helmet security headers
- CORS configuration
- Rate limiting (100 requests/15min)
- Input validation with express-validator
- Protected routes with role-based access
- File upload restrictions (size, type)

## 📦 Deployment

### Environment Variables for Production

**Backend (.env):**
- Set strong `JWT_SECRET` and `JWT_REFRESH_SECRET`
- Use MongoDB Atlas connection string
- Set `NODE_ENV=production`
- Update `CLIENT_URL` to production domain

**Frontend (.env):**
- Update `REACT_APP_API_URL` to production API URL

### Build for Production

**Frontend:**
```bash
cd client
npm run build
```

Serve the `build` folder with your web server.

**Backend:**
Already production-ready. Set environment variables and run:
```bash
cd server
npm start
```

### Docker Deployment

```bash
docker-compose -f docker-compose.yml up -d
```

## 🧪 Testing

Create test users:
1. Register via signup page
2. Use seeded admin account for admin features

Test workflows:
- Browse menu → Add to cart → Checkout
- Make reservation
- Admin: Manage orders, update menu
- Leave reviews (requires completed orders)

## 🐛 Troubleshooting

**MongoDB Connection Failed:**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

**Port Already in Use:**
- Change PORT in server/.env
- Change proxy in client/package.json

**CORS Errors:**
- Verify CLIENT_URL matches frontend URL
- Check server CORS configuration

**Images Not Uploading:**
- Ensure `server/uploads` directory exists
- Check file size limits in `server/middleware/upload.js`

## 📚 Additional Resources

- [API Documentation](./API_DOCUMENTATION.md)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [TailwindCSS Docs](https://tailwindcss.com)

## 📄 License

This project is original work created for Lumière Café. All rights reserved.

## 💡 Support

For issues or questions, contact the development team.

---

**Built with ❤️ for Lumière Café**
