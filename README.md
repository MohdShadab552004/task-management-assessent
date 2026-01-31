# Task Management Application

A full-stack Task Management Web Application built with React, Shadcn UI, Node.js, Express, MongoDB, and Redis for the Global Trend Full Stack Development Internship Assessment.

## 🚀 Features

- **Authentication**: Secure JWT-based authentication (Login, Register, Forgot/Reset Password)
- **Protected Routes**: Secure access to task management features
- **CRUD Operations**: Create, Read, Update, and Delete tasks
- **Modern UI**: React + Shadcn UI with a clean black/white theme
- **Form Validation**: React Hook Form + Zod (frontend) and express-validator (backend)
- **Responsive Design**: Works on all screen sizes
- **Toast Notifications**: Sonner for user feedback
- **Redis Caching**: Improved performance with cache layer
- **Status Filtering**: Filter tasks by pending, in-progress, or completed

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- TypeScript
- Shadcn UI (Radix UI primitives)
- React Hook Form + Zod
- Axios
- Sonner (Toast notifications)
- Tailwind CSS v4

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Redis (caching)
- JSON Web Token (JWT)
- express-validator
- Nodemailer (Email service)

## 📁 Project Structure

```
global-assessment/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/        # UI Components
│   │   │   ├── common/        # Shared components (Navbar, Layout, ProtectedRoute)
│   │   │   ├── task/          # Task-related components (TaskForm, TaskList, TaskCard)
│   │   │   └── ui/            # Shadcn UI primitives
│   │   ├── hooks/             # Custom Hooks (useTasks, useAuth)
│   │   ├── context/           # React Context (AuthContext)
│   │   ├── services/          # API Layer (taskService, authService)
│   │   ├── pages/             # Page Components
│   │   └── lib/               # Utilities
│   └── package.json
│
├── server/                    # Node.js Backend
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # Express routes
│   │   ├── middleware/        # Custom middleware (auth, error handler)
│   │   ├── utils/             # Helper functions (email service)
│   │   └── config/            # DB & Redis config
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Redis (optional, for caching)

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (or update existing):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-management
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_jwt_secret_key
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create `.env` file for custom API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user and get JWT |
| POST | /api/auth/forgot-password | Send password reset email |
| POST | /api/auth/reset-password/:token | Reset password with token |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks (with pagination & filtering) |
| GET | /api/tasks/:id | Get single task |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |

## ✅ Validation Rules

### Task Fields

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| title | string | Yes | Max 100 characters |
| description | string | No | Max 500 characters |
| status | enum | No | pending, in-progress, completed |

## 🏗️ Architecture

- **Frontend**: Component-based architecture with separated logic (Hooks) and Global State (Context API for Auth).
- **Backend**: MVC pattern with controllers, routes, and models.
- **Security**: JWT for authentication, Bcrypt for password hashing.
- **Validation**: Dual validation on both frontend (Zod) and backend (express-validator).
- **Caching**: Redis caching layer for task lists to improve read performance.

## 📝 Author

Built for Global Trend Full Stack Development Internship Assessment
