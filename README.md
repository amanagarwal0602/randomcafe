# Lumière Café - Premium Restaurant Management System

A complete, production-ready café website with customer portal and admin panel.

## 🌟 Features

### Public Website
- **Home Page**: Hero section, highlights, and CTAs
- **Menu Pages**: Breakfast, Lunch, Drinks, Desserts with filters
- **About Us**: Story, chef section, sustainability
- **Gallery**: Grid layout with lightbox viewer
- **Contact**: Map, form, opening hours, reviews
- **Reservations**: Table booking system

### Customer Portal
- User authentication (signup/login)
- Profile management
- Order history
- Favorite items
- Table reservations
- Feedback system
- Cart & checkout

### Admin Panel
- Dashboard with analytics
- Menu management (CRUD operations)
- Order tracking and management
- Reservation management
- Gallery management
- User management
- SEO settings

## 🛠 Tech Stack

**Frontend:**
- React 18
- React Router v6
- TailwindCSS
- Framer Motion
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (file uploads)
- Bcrypt (password hashing)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. **Clone and Install**
```bash
npm run install:all
```

2. **Configure Environment Variables**

Create `.env` in the `server` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lumiere-cafe
JWT_SECRET=your-secret-key-here-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-here
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

Create `.env` in the `client` folder:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. **Run Development Servers**
```bash
# Run both client and server
npm run dev

# Or run separately
npm run client  # Client on http://localhost:3000
npm run server  # Server on http://localhost:5000
```

## 🚀 Deployment

### Using Docker

```bash
docker-compose up -d
```

### Manual Deployment

**Backend:**
```bash
cd server
npm install
npm start
```

**Frontend:**
```bash
cd client
npm install
npm run build
# Serve the build folder with your preferred hosting
```

## 📱 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Menu Endpoints
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create menu item (Admin)
- `PUT /api/menu/:id` - Update menu item (Admin)
- `DELETE /api/menu/:id` - Delete menu item (Admin)

[See full documentation for all endpoints]

## 👤 Default Admin Account

After seeding the database:
- **Email**: admin@lumierecafe.com
- **Password**: Admin@123

**⚠️ Change these credentials in production!**

## 📁 Project Structure

```
lumiere-cafe/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context providers
│   │   ├── services/      # API services
│   │   ├── utils/         # Utilities
│   │   └── App.js
│   └── package.json
├── server/                # Express backend
│   ├── config/           # Configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── uploads/          # Uploaded files
│   └── server.js
└── package.json
```

## 🎨 Design System

**Colors:**
- Primary: Warm beige (#F5F1E8)
- Secondary: Deep brown (#4A2C2A)
- Accent: Gold (#C9A961)

**Typography:**
- Headings: Playfair Display
- Body: Inter

## 📄 License

ISC

## 🤝 Contributing

This is a complete template project. Feel free to customize for your needs.

## 📞 Support

For issues and questions, please create an issue in the repository.
