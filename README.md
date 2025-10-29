# 🧑‍💻 User Authentication App

A fullstack **User Authentication System** built with **React**, **Node.js**, **Express**, and **MongoDB**, featuring user **registration**, **login**, **profile CRUD**, and **logout** functionality.

---

## 🚀 Features

### 🔐 Authentication

- User Registration with validation
- Secure Login using JWT
- Logout (token invalidation)

### 👤 Profile Management

- View user profile
- Edit profile details
- Delete user account

### ⚙️ Backend Features

- RESTful API built with Express.js
- JWT Authentication middleware
- MongoDB with Mongoose
- Error handling & validation

### 💅 Frontend Features

- React + Vite setup
- TailwindCSS for modern styling
- React Router DOM for navigation
- Axios for API calls
- Toast notifications for user feedback

---

## 🧩 Tech Stack

**Frontend:**

- React (Vite)
- TailwindCSS
- Axios
- React Router DOM

**Backend:**

- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- bcrypt.js

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the Repository

git clone https://github.com/yourusername/User_auth.git
cd User_auth

### 2️⃣ Setup Backend

cd backend
npm install

# Create a .env file inside the /backend folder and add:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Run the backend server

npm run dev

# The backend should now run on:

# http://localhost:4000

### 3️⃣ Setup Frontend

cd ../frontend
npm install

# Start the frontend development server

npm run dev

# The frontend will be available at:

# http://localhost:5173
