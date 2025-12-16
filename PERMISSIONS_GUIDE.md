# Complete Permissions System Guide

## ✅ All Permissions Implemented

### How It Works:
1. **Admin role** - Has access to EVERYTHING automatically
2. **Staff/Customer with permissions** - Can access specific pages based on assigned permissions
3. **Permission-based routing** - Routes check BOTH role AND permissions

---

## 📋 All Available Permissions

### Dashboard
- `view_dashboard` - Access admin dashboard
- `view_analytics` - View sales and analytics reports

### Orders
- `view_orders` - View customer orders
- `edit_orders` - Update order status
- `delete_orders` - Cancel/delete orders

### Menu
- `view_menu` - View menu items
- `add_menu` - Create new menu items
- `edit_menu` - Update menu items
- `delete_menu` - Remove menu items
- `toggle_availability` - Enable/disable menu items

### Reservations
- `view_reservations` - View table bookings
- `edit_reservations` - Update reservation status
- `delete_reservations` - Cancel reservations

### Gallery
- `view_gallery` - View gallery images
- `add_gallery` - Upload new images
- `edit_gallery` - Update image details
- `delete_gallery` - Remove images

### Users
- `view_users` - View user list
- `edit_users` - Update user details
- `delete_users` - Remove users
- `manage_roles` - Assign roles and permissions

### Coupons
- `view_coupons` - View discount codes
- `add_coupons` - Create new coupons
- `edit_coupons` - Update coupons
- `delete_coupons` - Remove coupons

### Reviews
- `view_reviews` - View customer reviews
- `edit_reviews` - Moderate reviews
- `delete_reviews` - Remove reviews

### CMS Content
- `view_cms` - View website content
- `edit_hero` - Update homepage banner
- `edit_about` - Update about section
- `edit_features` - Manage features
- `edit_team` - Manage team members
- `edit_contact` - Update contact details
- `edit_settings` - Manage site configuration
- `edit_seo` - Manage SEO settings

---

## 🎭 Predefined Role Templates

### Administrator
**All permissions** - Complete system access

### Manager
- Dashboard + Analytics
- Orders (view, edit)
- Menu (view, edit, toggle)
- Reservations (view, edit)
- Users (view only)
- Coupons (all)
- Reviews (view, edit)

### Chef
- Dashboard
- Orders (view, edit)
- Menu (view, add, edit, toggle)

### Waiter
- Orders (view, edit)
- Menu (view)
- Reservations (view, edit)

### Content Editor
- Dashboard
- CMS Content (all)
- Gallery (view, add, edit)
- Menu (view, edit)

### Viewer
- Dashboard
- View-only access to Orders, Menu, Reservations, Gallery, CMS

---

## 🔧 How to Assign Permissions

1. **Login as admin** (`admin` / `admin`)
2. **Go to Admin → Roles & Permissions**
3. **Select a user** to edit
4. **Choose permissions** individually OR use role template
5. **Save changes**

---

## 🎯 Example Use Cases

### Scenario 1: Give someone access to only manage orders
**Assign permissions:**
- `view_dashboard`
- `view_orders`
- `edit_orders`

**Result:** They can login and access /admin/orders page only

### Scenario 2: Content manager who can't see orders/users
**Use template:** Content Editor
**Or assign:**
- `view_dashboard`
- `view_cms`
- `edit_hero`, `edit_about`, `edit_features`, etc.
- `view_gallery`, `add_gallery`, `edit_gallery`

**Result:** Access to CMS pages and gallery only

### Scenario 3: Kitchen staff
**Use template:** Chef
**Result:** Can see orders and manage menu items

---

## ✅ What's Fixed

1. **ProtectedRoute** - Now checks permissions in addition to roles
2. **All Admin Routes** - Updated with correct permission requirements
3. **Admin Role** - Automatically has all permissions
4. **Permission Utility** - Properly checks user permissions array
5. **Menu Filtering** - Only shows menu items user has access to

---

## 🚀 Testing

1. Create a test user with role "customer"
2. Assign specific permissions (e.g., `view_orders`, `edit_orders`)
3. Login as that user
4. Verify they can access /admin/orders but not other admin pages
5. Verify the admin menu only shows items they have access to

---

**All permissions are production-ready!** 🎉
