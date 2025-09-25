# Student Registration System

A full-stack web application for student registration with React frontend and Node.js/Express backend.

## Features
- Student registration form with validation
- MongoDB database integration  
- Modern responsive UI
- Real-time form validation
- Error handling and success messages
- 🛡️ **Protected Routes** - Route protection with authentication checks
- ⚡ **Real-time Feedback** - Password strength indicator and error handling
- 🌟 **Smooth UX** - Loading states and animations

### Backend
- 🔒 **Secure API** - JWT authentication with bcrypt password hashing
- 📊 **MongoDB Integration** - Using Mongoose ODM
- ✅ **Input Validation** - Comprehensive server-side validation
- 🛡️ **CORS Protection** - Properly configured CORS
- 📝 **RESTful API** - Clean API structure with proper HTTP codes
- 🔄 **Auto Token Refresh** - Automatic token management

## Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Project Structure

```
EAD_Assignment2/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── auth/          # Authentication components
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/           # React Context providers
│   │   │   └── AuthContext.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/          # API services
│   │   │   └── api.js
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                    # Backend Node.js application
│   ├── models/               # Database models
│   │   └── User.js
│   ├── routes/               # API routes
│   │   └── auth.js
│   ├── middleware/           # Custom middleware
│   │   └── auth.js
│   ├── app.js               # Express app configuration
│   ├── package.json
│   └── .env                 # Environment variables
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd EAD_Assignment2
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ead_assignment2
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup
```bash
cd client
npm install
```

### 4. Database Setup
Make sure MongoDB is running on your system. The application will automatically create the database and collections on first run.

## Running the Application

### Start Backend Server
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/register` | Register new user | No |
| POST   | `/login` | Login user | No |
| GET    | `/me` | Get current user | Yes |
| PUT    | `/profile` | Update user profile | Yes |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/health` | Server health check |

## User Registration Schema

```javascript
{
  firstName: String (required, 2-50 chars),
  lastName: String (required, 2-50 chars),
  username: String (required, unique, 3-50 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Features in Detail

### 🔐 Authentication
- JWT token-based authentication
- Password hashing with bcrypt (12 rounds)
- Automatic token refresh and management
- Secure logout functionality

### 🎨 User Interface
- Modern, clean design with Tailwind CSS
- Responsive layout for all screen sizes
- Loading states and error feedback
- Password strength indicator
- Form validation with real-time feedback

### 🛡️ Security
- Input validation on both client and server
- Protected routes with authentication checks
- CORS protection
- SQL injection protection with Mongoose
- Password complexity requirements

### 📱 User Experience
- Smooth page transitions
- Automatic redirects after authentication
- Remember login state
- Clear error messages
- Success notifications

## Development

### Available Scripts

#### Frontend (`client/`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

#### Backend (`server/`)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Environment Variables

#### Server (`.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ead_assignment2
JWT_SECRET=your-jwt-secret-key
CLIENT_URL=http://localhost:5173
```

## Testing the Application

### Manual Testing Steps

1. **Registration Flow**
   - Go to `/register`
   - Fill out the registration form
   - Test form validation
   - Verify successful registration redirects to dashboard

2. **Login Flow**
   - Go to `/login`
   - Test with valid credentials
   - Test with invalid credentials
   - Verify successful login redirects to dashboard

3. **Protected Routes**
   - Try accessing `/dashboard` without authentication
   - Verify redirect to login page
   - Login and verify access to protected content

4. **Logout**
   - Click logout in dashboard
   - Verify redirect to home page
   - Try accessing protected routes after logout

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Make sure MongoDB is running
   - Check the `MONGODB_URI` in `.env`
   - Verify network connectivity

2. **CORS Issues**
   - Check if backend is running on port 5000
   - Verify frontend is running on port 5173
   - Check CORS configuration in `server/app.js`

3. **Token Issues**
   - Check JWT_SECRET in `.env`
   - Clear browser localStorage if needed
   - Verify token expiration settings

4. **Build Issues**
   - Delete `node_modules` and reinstall dependencies
   - Check Node.js version compatibility
   - Verify all environment variables are set

## License

This project is for educational purposes as part of EAD Assignment 2.

## Author

Created for EAD Course Assignment - 2025