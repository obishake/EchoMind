# EchoMind 📝

A modern, full-stack blog platform built with the MERN stack. EchoMind allows users to create, share, and engage with blog posts in a beautiful and responsive interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)

## ✨ Features

### 🔐 Authentication & User Management

-   User registration and secure login with JWT
-   Persistent authentication with token storage
-   Protected routes for authenticated users
-   User profile management with avatar uploads
-   Personal bio and user information

### 📝 Blog Management

-   Create, read, update, and delete blog posts
-   Rich text content support
-   Cover image uploads via Cloudinary
-   Tag-based organization
-   Search functionality (title, content, author)
-   Filter blogs by tags
-   User dashboard with blog statistics

### 💬 Comments System

-   Add comments to blog posts
-   Edit and delete your own comments
-   Real-time comment updates
-   User avatars in comments

### 🎨 UI/UX

-   Responsive design (mobile, tablet, desktop)
-   Dark/Light mode toggle
-   Toast notifications for user feedback
-   Loading states and smooth transitions
-   Custom scrollbar styling
-   Beautiful card layouts
-   404 error page handling

## 🚀 Tech Stack

### Frontend

-   **React 19** - UI library
-   **Vite** - Build tool and dev server
-   **React Router v7** - Client-side routing
-   **TailwindCSS v4** - Utility-first CSS framework
-   **Axios** - HTTP client
-   **React Hot Toast** - Notifications
-   **React Icons** - Icon library
-   **Context API** - State management

### Backend

-   **Node.js** - Runtime environment
-   **Express 5** - Web framework
-   **MongoDB & Mongoose** - Database and ODM
-   **JWT** - Authentication
-   **Bcrypt** - Password hashing
-   **Cloudinary** - Image storage and management
-   **Cookie Parser** - Cookie handling
-   **CORS** - Cross-origin resource sharing
-   **Dotenv** - Environment configuration

## 📁 Project Structure

```
EchoMind/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and API client
│   │   ├── context/       # React Context providers
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── package.json
│
├── server/                # Node.js backend
│   ├── controllers/       # Request handlers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── lib/              # Utilities (DB, Cloudinary, JWT)
│   └── package.json
│
└── package.json          # Root package for scripts
```

## 🛠️ Installation & Setup

### Prerequisites

-   Node.js (v16 or higher)
-   MongoDB Atlas account or local MongoDB
-   Cloudinary account (for image uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/obishake/EchoMind.git
cd EchoMind
```

### 2. Install Dependencies

```bash
# Install all dependencies (client + server)
npm run install-all
```

Or install separately:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Configuration

#### Server Environment Variables

Create `server/.env` file:

```env
PORT=5050
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database_name"
JWT_SECRET="your-jwt-secret-key"
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

#### Client Environment Variables

Create `client/.env` file:

```env
VITE_API_URL=http://localhost:5050/api
```

> **⚠️ Security Note:** Never commit `.env` files to version control. Use `.env.example` files for reference.

### 4. Run the Application

#### Development Mode (Both servers)

```bash
npm run dev
```

#### Run Separately

```bash
# Terminal 1 - Run backend
npm run server

# Terminal 2 - Run frontend
npm run client
```

#### Build for Production

```bash
npm run build
```

## 🌐 API Endpoints

### Authentication Routes

-   `POST /api/auth/signup` - Register new user
-   `POST /api/auth/login` - Login user
-   `POST /api/auth/logout` - Logout user
-   `GET /api/auth/profile` - Get user profile
-   `PUT /api/auth/profile` - Update user profile

### Blog Routes

-   `GET /api/blogs` - Get all blogs
-   `GET /api/blogs/:id` - Get single blog
-   `POST /api/blogs` - Create blog (auth required)
-   `PUT /api/blogs/:id` - Update blog (auth required)
-   `DELETE /api/blogs/:id` - Delete blog (auth required)

### Comment Routes

-   `GET /api/comments/:blogId` - Get blog comments
-   `POST /api/comments/:blogId` - Add comment (auth required)
-   `PUT /api/comments/:id` - Update comment (auth required)
-   `DELETE /api/comments/:id` - Delete comment (auth required)

## 📱 Application Pages

-   **Home** (`/`) - Landing page with all blog posts
-   **Login** (`/login`) - User authentication
-   **Signup** (`/signup`) - User registration
-   **Dashboard** (`/dashboard`) - User dashboard with stats
-   **Profile** (`/profile`) - User profile management
-   **Create Blog** (`/create`) - New blog post creation
-   **Edit Blog** (`/edit/:id`) - Edit existing blog
-   **Blog Detail** (`/blog/:id`) - View single blog with comments

## 🔒 Security Features

-   JWT-based authentication
-   Password hashing with bcrypt
-   HTTP-only cookies for token storage
-   Protected API routes with auth middleware
-   CORS configuration
-   Input validation and sanitization
-   Secure environment variable management

## 🎯 Key Components

### Frontend Components

-   `Navbar` - Navigation with auth state
-   `BlogCard` - Blog post card display
-   `CommentItem` - Individual comment display
-   `ProtectedRoute` - Route protection wrapper
-   `Loader` - Loading state component
-   `Footer` - Application footer

### Context Providers

-   `AuthContext` - Authentication state management
-   `BlogContext` - Blog data management
-   `CommentContext` - Comment data management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👤 Author

**Abhishek**

-   GitHub: [@obishake](https://github.com/obishake)

## 🙏 Acknowledgments

-   React team for the amazing library
-   MongoDB for the database solution
-   Cloudinary for image management
-   TailwindCSS for the utility-first CSS framework
-   All contributors and supporters



Made with ❤️ by Abhishek
