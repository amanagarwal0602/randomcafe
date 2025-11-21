# Lumière Café - Premium UK-Style Café Management System

A complete, serverless café website with professional UK café aesthetics, featuring localStorage-based data management, comprehensive RBAC system, and full admin control panel.

## 🌟 Features

### Public Website
- **Home Page**: Elegant hero section with Cormorant Garamond typography
- **Menu Pages**: Breakfast, Lunch, Drinks, Desserts with category filters
- **About Us**: Café story, chef profiles, sustainability commitment
- **Gallery**: Responsive grid with lightbox viewer
- **Contact**: Interactive map, contact form, opening hours, customer reviews
- **Reservations**: Real-time table booking system
- **Professional UK Café Design**: Warm amber/stone color palette, elegant shadows, smooth animations

### Customer Portal
- User authentication (signup/login with password visibility toggle)
- Profile management with avatar upload
- Order history tracking
- Favorite items management
- Table reservation system
- Feedback and review submission
- Shopping cart & checkout

### Admin Panel (Full RBAC Control)
- **Dashboard**: Real-time analytics, charts, KPIs
- **Menu Management**: Full CRUD operations with categories
- **Order Management**: 
  - Date-wise grouping with expand/collapse
  - Status tracking (Pending, Preparing, Ready, Delivered, Cancelled)
  - Bill generation and printing
  - Daily bill number tracking
- **Reservation Management**: Approve/reject bookings, table assignment
- **Gallery Management**: Image upload, categorization, visibility control
- **User Management**: Customer & staff management
- **Staff Management**: Role-based permissions (42+ permissions)
- **SEO Settings**: Meta tags, descriptions, keywords
- **Settings**: Site configuration, opening hours, contact info

### Role-Based Access Control (RBAC)
**Admin Permissions**: Full system access (42 permissions)
**Chef Permissions**: Kitchen operations, menu viewing, order management
**Waiter Permissions**: Order taking, table management, customer service

## 🛠 Tech Stack

**Frontend:**
- React 18.2.0
- React Router v6.20.1
- TailwindCSS 3.4.0 with custom UK café theme
- React Icons 4.12.0
- React Toastify 9.1.3
- Date-fns 3.0.6
- Axios 1.6.2
- Framer Motion 10.16.16

**Data Storage:**
- Browser localStorage (Serverless - No backend required)
- Client-side data persistence
- JSON-based data structure
- Easily migrable to SheetDB or any backend API

**Design System:**
- **Fonts**: Cormorant Garamond (serif headings), Montserrat (sans-serif body), Lora (alternative serif)
- **Colors**: 
  - Primary/Amber: 50-900 scale (#FFFBEB to #78350F)
  - Stone: 50-900 scale (#FAFAF9 to #1C1917)
  - Accent Gold: #B45309, #D97706
- **Shadows**: elegant, elegant-lg, elegant-xl with warm amber tones
- **Animations**: fadeIn, fadeInUp, slideUp, slideDown, slideInRight, slideInLeft, scaleIn

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Modern web browser with localStorage support

### Quick Start

1. **Clone the Repository**
```bash
git clone https://github.com/amanagarwal0602/randomcafe.git
cd randomcafe
```

2. **Install Dependencies**
```bash
cd client
npm install
```

3. **Run Development Server**
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🚀 Deployment

### Vercel Deployment (Recommended)

The project includes `vercel.json` for seamless Vercel deployment:

```bash
cd client
vercel --prod
```

**vercel.json Features:**
- Client-side routing support (all routes → index.html)
- Static asset caching (1 year max-age)
- Optimized for SPA deployment

### Manual Build

```bash
cd client
npm run build
```

Deploy the `build` folder to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 💾 Data Management

### LocalStorage Database

The app uses browser localStorage as a complete database replacement:

**Data Structure:**
- `users`: Staff and customers (Admin, Chef, Waiter, Customer roles)
- `menu`: Menu items with categories, pricing, images
- `orders`: Order history with items, totals, status, daily bill numbers
- `reservations`: Table bookings with date/time, guest count
- `gallery`: Image galleries with categories
- `about`: Café information, hero content, chef profiles
- `contact`: Contact information, opening hours, reviews
- `settings`: SEO, site configuration

**Sample Data:**
Use the force-reset page (`/force-reset.html`) to:
- Clear all data
- Load comprehensive sample data (50+ menu items, orders, reservations)
- Reset to admin-only state

### Migrating to Backend

The localStorage layer (`src/services/localStorage.js`) can be easily replaced with:
- SheetDB integration (prepared in `src/services/sheetdb.js`)
- REST API backend
- Firebase/Supabase
- MongoDB Atlas

All CRUD operations are abstracted in service files for easy migration.

## 👤 Default Login Credentials

**Admin Account:**
- **Email**: admin@lumierecafe.com
- **Password**: Admin@123

**Chef Account:**
- **Email**: chef@lumierecafe.com
- **Password**: Chef@123

**Waiter Account:**
- **Email**: waiter@lumierecafe.com
- **Password**: Waiter@123

**⚠️ Change these credentials in production!**

## 📁 Project Structure

```
randomcafe/
├── client/                      # React frontend (main app)
│   ├── public/
│   │   ├── index.html
│   │   ├── force-reset.html    # Data reset & sample data loader
│   │   ├── sampleDataFull.json # Comprehensive sample data
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── public/         # Public-facing pages
│   │   │   │   ├── Home.js
│   │   │   │   ├── Menu.js
│   │   │   │   ├── About.js
│   │   │   │   ├── Gallery.js
│   │   │   │   ├── Contact.js
│   │   │   │   └── Reservation.js
│   │   │   ├── auth/           # Authentication pages
│   │   │   │   ├── Login.js
│   │   │   │   └── Signup.js
│   │   │   ├── customer/       # Customer portal
│   │   │   │   ├── CustomerDashboard.js
│   │   │   │   ├── CustomerOrders.js
│   │   │   │   ├── CustomerReservations.js
│   │   │   │   └── CustomerProfile.js
│   │   │   └── admin/          # Admin panel
│   │   │       ├── AdminDashboard.js
│   │   │       ├── AdminMenu.js
│   │   │       ├── AdminOrders.js (date-wise view)
│   │   │       ├── AdminReservations.js
│   │   │       ├── AdminGallery.js
│   │   │       ├── AdminUsers.js
│   │   │       ├── AdminStaff.js (RBAC)
│   │   │       └── AdminSettings.js
│   │   ├── services/
│   │   │   ├── localStorage.js # LocalStorage CRUD layer
│   │   │   ├── sheetdb.js      # SheetDB integration (ready)
│   │   │   └── api.js          # API abstraction
│   │   ├── context/
│   │   │   └── AuthContext.js  # Auth state management
│   │   ├── utils/
│   │   │   └── permissions.js  # RBAC permission definitions
│   │   ├── index.css           # Global styles + UK café design
│   │   ├── App.js              # Main routing
│   │   └── index.js
│   ├── tailwind.config.js      # Custom UK café theme
│   ├── vercel.json             # Vercel deployment config
│   └── package.json
└── README.md
```

## 🎨 UK Café Design System

### Color Palette
```css
Primary (Amber):
  - 50:  #FFFBEB (lightest cream)
  - 100: #FEF3C7
  - 600: #D97706 (accent gold)
  - 700: #B45309 (primary gold)
  - 900: #78350F (darkest)

Stone (Neutrals):
  - 50:  #FAFAF9
  - 100: #F5F5F4
  - 600: #57534E (text)
  - 700: #44403C
  - 900: #1C1917 (darkest)
```

### Typography
- **Headings**: Cormorant Garamond (serif, elegant)
- **Body**: Montserrat (sans-serif, clean)
- **Alternative**: Lora (serif, warm)

### Custom Classes
```css
.btn-primary         # Amber gradient with uppercase tracking
.menu-card           # Hover lift with shadow transition
.section-title       # Centered with gold underline
.hero-title          # Large serif with text shadow
.admin-card          # Admin panel card styling
```

### Animations
- fadeIn, fadeInUp (entrance)
- slideUp, slideDown (accordion)
- slideInRight, slideInLeft (modals)
- scaleIn (zoom effect)

## 🔒 Security Features

- Password hashing with bcryptjs
- Role-based access control (RBAC)
- Protected routes for admin/customer areas
- Permission-based UI rendering
- Session management with localStorage tokens
- Input validation on forms
- XSS protection in user inputs

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly UI elements
- Optimized images for all screen sizes
- Collapsible navigation on mobile

## 🔄 Sample Data

Access `/force-reset.html` to:
1. **Clear All Data**: Remove all localStorage data
2. **Load Sample Data**: Import 50+ menu items, orders, reservations, gallery images
3. **Reset to Default**: Keep only admin, chef, waiter accounts

Sample data includes:
- 50+ menu items across all categories
- 20+ customer orders with various statuses
- 15+ table reservations
- 30+ gallery images
- Customer reviews and feedback
- Complete chef profiles

## 🧪 Testing

The app is production-ready with:
- Form validation on all inputs
- Error handling for localStorage operations
- Null checks and defensive programming
- Print functionality with proper formatting
- Date-wise order grouping with expand/collapse
- Toast notifications for user feedback

## 📄 License

MIT License - Free to use for personal and commercial projects

## 🤝 Contributing

Contributions welcome! This is a complete template project.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

- **GitHub Issues**: [Create an issue](https://github.com/amanagarwal0602/randomcafe/issues)
- **Repository**: [randomcafe](https://github.com/amanagarwal0602/randomcafe)
- **Owner**: amanagarwal0602

## 🙏 Acknowledgments

- Design inspiration from premium UK cafés
- Icons from React Icons (Feather Icons)
- Images from Unsplash
- Fonts from Google Fonts

---

**Built with ❤️ for the café industry** | Serverless • Elegant • Production-Ready
