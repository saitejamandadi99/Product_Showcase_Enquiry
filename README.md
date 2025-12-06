# Product Showcase & Enquiry — Full Stack Application

A full-stack application that lets users browse products, view product details, and submit enquiries—plus a secure admin dashboard to manage all enquiries. Built with **React**, **Node.js**, **Express**, and **SQLite**.

---

## 🚀 Features

### 🔹 User Features
- **Browse all products**
- **Filter by category**
- **Search products**
- **Pagination support**
- **View product details page**
- **Submit an enquiry** for any product

### 🔹 Admin Features
- **Register & Login** (JWT authentication)
- **Protected Admin Dashboard**
- **View all enquiries** from users
- **Logout functionality**

### 🔹 General Features
- **Responsive UI**
- Clean folder structure
- Backend input validation
- **SQLite** database with auto-seeded demo data

---

## 🛠 Tech Stack

**Frontend**
- React.js
- Axios
- React Router
- Custom CSS

**Backend**
- Node.js
- Express.js
- better-sqlite3
- JWT Authentication
- bcryptjs
- dotenv
- CORS

**Database**
- SQLite (better-sqlite3)

---

## 📁 Project Folder Structure

```
Product_Showcase_Enquiry/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   │
│   ├── database/
│   │   ├── db.js
│   │   ├── init.js
│   │
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── enquiriesController.js
│   │   ├── authControllers.js
│   │
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── enquiriesRoutes.js
│   │   ├── authRoutes.js
│   │
│   ├── middleware/
│       ├── authMiddleware.js
│
├── frontend/
│   ├── package.json
│   ├── .env
│   │
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   │
│   │   ├── components/
│   │   │   ├── Header/Header.jsx
│   │   │   ├── ProductsCard/ProductCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │       ├── mainPage/MainPage.jsx
│   │       ├── ProductDetails/ProductDetails.jsx
│   │       ├── Admin/AdminDashboard.jsx
│   │       ├── Login/Login.jsx
│   │       ├── Register/Register.jsx
│   │
│   ├── styles/
│       ├── mainpage.css
│       ├── productdetails.css
│       ├── auth.css
│       ├── header.css
│
└── README.md
```

---

## 🔧 Backend Setup

1. **Install dependencies**
    ```bash
    cd backend
    npm install
    ```
2. **Create a `.env` file**
    ```
    PORT=5000
    JWT_SECRET=your_secret_key
    ```
3. **Start the backend server**
    ```bash
    npm run dev
    ```

The backend runs at [http://localhost:5000](http://localhost:5000)

---

## 🔧 Frontend Setup

1. **Install dependencies**
    ```bash
    cd frontend
    npm install
    ```
2. **Create a `.env` file**
    ```
    REACT_APP_API_URL=http://localhost:5000
    ```
3. **Run the frontend**
    ```bash
    npm start
    ```

The frontend runs at [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

### Products

| Method | Endpoint                | Description                                   |
|--------|------------------------|-----------------------------------------------|
| GET    | `/api/products`        | Get all products (search, category, paginate) |
| GET    | `/api/products/:id`    | Get single product                            |

### Enquiries

| Method | Endpoint                | Description                  |
|--------|------------------------|------------------------------|
| POST   | `/api/enquiries`       | Submit enquiry for a product |
| GET    | `/api/enquiries`       | Get all enquiries (Admin)    |

### Auth

| Method | Endpoint                 | Description                           |
|--------|--------------------------|---------------------------------------|
| POST   | `/api/auth/register`     | Admin register                        |
| POST   | `/api/auth/login`        | Admin login (receives JWT token)      |

#### 🔐 Protected Routes

- **Frontend**:  
    `/admin` → `ProtectedRoute` → `AdminDashboard`
- **Backend**:  
    `authMiddleware.js` verifies token

---

## 📝 How to Seed Database

Database initializes itself on backend start:

`backend/database/init.js`

This script creates:
- `products` table
- `users` table
- `enquiries` table
- Inserts 12 sample products

---

## 🎯 Future Improvements

- Image upload instead of URLs
- More detailed pagination
- Role-based admin system
- Email notifications for new enquiry
- UI animations & improved design

---

## 🎉 Conclusion

This project demonstrates full-stack skills from database design to REST APIs, authentication, React UI, and state management.

Feel free to fork and extend it, or use as a reference for your own CRUD+auth stack!

---
