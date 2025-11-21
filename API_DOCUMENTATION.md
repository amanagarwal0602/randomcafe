# Lumière Café - API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <access_token>
```

### Authentication Endpoints

#### Register User
- **POST** `/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```
- **Response:** `{ success: true, data: { user, accessToken, refreshToken } }`

#### Login
- **POST** `/auth/login`
- **Body:** `{ email, password }`
- **Response:** `{ success: true, data: { user, accessToken, refreshToken } }`

#### Refresh Token
- **POST** `/auth/refresh`
- **Body:** `{ refreshToken }`
- **Response:** `{ success: true, data: { accessToken } }`

#### Get Current User
- **GET** `/auth/me` (Protected)
- **Response:** `{ success: true, data: { user } }`

#### Logout
- **POST** `/auth/logout` (Protected)
- **Response:** `{ success: true, message }`

---

## Menu Endpoints

#### Get Menu Items
- **GET** `/menu`
- **Query Params:** `category, dietary, minPrice, maxPrice, search, page, limit`
- **Response:** `{ success: true, data: { items, pagination } }`

#### Get Single Menu Item
- **GET** `/menu/:id`
- **Response:** `{ success: true, data: { item } }`

#### Create Menu Item (Admin)
- **POST** `/menu` (Protected, Admin)
- **Body:** FormData with `name, description, price, category, image, dietary, allergens`
- **Response:** `{ success: true, data: { item } }`

#### Update Menu Item (Admin)
- **PUT** `/menu/:id` (Protected, Admin)
- **Body:** Same as create
- **Response:** `{ success: true, data: { item } }`

#### Delete Menu Item (Admin)
- **DELETE** `/menu/:id` (Protected, Admin)
- **Response:** `{ success: true, message }`

---

## Order Endpoints

#### Create Order
- **POST** `/orders` (Protected)
- **Body:**
```json
{
  "items": [{ "menuItem": "id", "quantity": 2, "price": 12.99 }],
  "orderType": "dine-in",
  "contactPhone": "1234567890",
  "paymentMethod": "card"
}
```
- **Response:** `{ success: true, data: { order } }`

#### Get My Orders
- **GET** `/orders` (Protected)
- **Query:** `page, limit`
- **Response:** `{ success: true, data: { orders, pagination } }`

#### Get Single Order
- **GET** `/orders/:id` (Protected)
- **Response:** `{ success: true, data: { order } }`

#### Update Order Status (Admin/Staff)
- **PUT** `/orders/:id/status` (Protected, Admin/Staff)
- **Body:** `{ status: "confirmed" }`
- **Response:** `{ success: true, data: { order } }`

#### Cancel Order
- **PUT** `/orders/:id/cancel` (Protected)
- **Response:** `{ success: true, data: { order } }`

---

## Reservation Endpoints

#### Get Available Slots
- **GET** `/reservations/available-slots/:date`
- **Response:** `{ success: true, data: { slots } }`

#### Create Reservation
- **POST** `/reservations` (Protected)
- **Body:** `{ date, timeSlot, numberOfGuests, guestName, guestEmail, guestPhone, occasion, specialRequests }`
- **Response:** `{ success: true, data: { reservation } }`

#### Get My Reservations
- **GET** `/reservations` (Protected)
- **Response:** `{ success: true, data: { reservations, pagination } }`

#### Update Reservation
- **PUT** `/reservations/:id` (Protected)
- **Body:** Same as create
- **Response:** `{ success: true, data: { reservation } }`

#### Cancel Reservation
- **PUT** `/reservations/:id/cancel` (Protected)
- **Response:** `{ success: true, data: { reservation } }`

---

## Gallery Endpoints

#### Get Gallery Images
- **GET** `/gallery`
- **Query:** `category, page, limit`
- **Response:** `{ success: true, data: { images, pagination } }`

#### Upload Image (Admin)
- **POST** `/gallery` (Protected, Admin)
- **Body:** FormData with `title, description, category, tags, image`
- **Response:** `{ success: true, data: { image } }`

#### Update Gallery Image (Admin)
- **PUT** `/gallery/:id` (Protected, Admin)
- **Body:** Same as upload
- **Response:** `{ success: true, data: { image } }`

#### Delete Gallery Image (Admin)
- **DELETE** `/gallery/:id` (Protected, Admin)
- **Response:** `{ success: true, message }`

---

## Review Endpoints

#### Get Reviews
- **GET** `/reviews`
- **Query:** `menuItem, rating, page, limit`
- **Response:** `{ success: true, data: { reviews, pagination } }`

#### Create Review
- **POST** `/reviews` (Protected)
- **Body:** `{ menuItem, order, rating, title, comment }`
- **Response:** `{ success: true, data: { review } }`

#### Get My Reviews
- **GET** `/reviews/my-reviews` (Protected)
- **Response:** `{ success: true, data: { reviews } }`

#### Respond to Review (Admin)
- **PUT** `/reviews/:id/respond` (Protected, Admin)
- **Body:** `{ response: "Thank you!" }`
- **Response:** `{ success: true, data: { review } }`

---

## User Endpoints

#### Get Profile
- **GET** `/users/profile` (Protected)
- **Response:** `{ success: true, data: { user } }`

#### Update Profile
- **PUT** `/users/profile` (Protected)
- **Body:** FormData with `name, phone, address, avatar`
- **Response:** `{ success: true, data: { user } }`

#### Change Password
- **PUT** `/users/change-password` (Protected)
- **Body:** `{ currentPassword, newPassword }`
- **Response:** `{ success: true, message }`

#### Toggle Favorite
- **PUT** `/users/favorites/:itemId` (Protected)
- **Response:** `{ success: true, data: { user } }`

#### Get Favorites
- **GET** `/users/favorites` (Protected)
- **Response:** `{ success: true, data: { favorites } }`

---

## Admin Endpoints

#### Dashboard Stats
- **GET** `/admin/dashboard/stats` (Protected, Admin/Staff)
- **Response:** `{ success: true, data: { stats } }`

#### Get All Orders
- **GET** `/admin/orders` (Protected, Admin/Staff)
- **Query:** `status, orderType, startDate, endDate, page, limit`
- **Response:** `{ success: true, data: { orders, pagination } }`

#### Get All Reservations
- **GET** `/admin/reservations` (Protected, Admin/Staff)
- **Query:** `status, startDate, endDate, page, limit`
- **Response:** `{ success: true, data: { reservations, pagination } }`

#### Update Reservation Status
- **PUT** `/admin/reservations/:id/status` (Protected, Admin/Staff)
- **Body:** `{ status, tableNumber }`
- **Response:** `{ success: true, data: { reservation } }`

#### Get All Users (Admin only)
- **GET** `/admin/users` (Protected, Admin)
- **Response:** `{ success: true, data: { users } }`

#### Update User Role (Admin only)
- **PUT** `/admin/users/:id/role` (Protected, Admin)
- **Body:** `{ role: "staff" }`
- **Response:** `{ success: true, data: { user } }`

#### Toggle User Active (Admin only)
- **PUT** `/admin/users/:id/toggle-active` (Protected, Admin)
- **Response:** `{ success: true, data: { user } }`

#### Get All Reviews
- **GET** `/admin/reviews` (Protected, Admin/Staff)
- **Response:** `{ success: true, data: { reviews } }`

#### Toggle Review Publish
- **PUT** `/admin/reviews/:id/toggle-publish` (Protected, Admin/Staff)
- **Response:** `{ success: true, data: { review } }`

---

## SEO Endpoints

#### Get SEO for Page
- **GET** `/seo/:page`
- **Response:** `{ success: true, data: { seo } }`

#### Update SEO
- **PUT** `/seo/:page` (Protected, Admin)
- **Body:** `{ title, description, keywords, ogImage, canonicalUrl }`
- **Response:** `{ success: true, data: { seo } }`

---

## Error Responses

All errors return:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Validation errors array if applicable"]
}
```

### Status Codes
- `200` Success
- `201` Created
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `500` Server Error
