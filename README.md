# Car Pooling Application

A full-stack car pooling application built with React.js frontend and Node.js backend, connected to a remote MySQL database.

![version](https://img.shields.io/badge/version-1.0.0-blue.svg)

## Overview

This is a comprehensive car pooling platform that allows users to offer and book rides. The application features a modern Material Design interface built with React and Material-UI, backed by a robust Node.js/Express API with MySQL database.

## Features

### Frontend (React.js)
- 🎨 Modern Material Design UI with Material Dashboard 2
- 📱 Responsive design for all devices
- 🔐 User authentication and authorization
- 🚗 Ride search and booking interface
- 📊 Dashboard with statistics and charts
- 👤 User profile management
- 🚙 Vehicle management
- 📅 Date/time pickers for ride scheduling
- 🔔 Real-time notifications
- 📝 Form validation with Formik and Yup

### Backend (Node.js/Express)
- 🔒 JWT-based authentication
- 🗄️ MySQL database with connection pooling
- ✅ Input validation with express-validator
- 🛡️ Security with Helmet.js and CORS
- 📝 Comprehensive API endpoints
- 🔐 Password hashing with bcrypt
- 🚀 RESTful API architecture
- 📊 Database schema for car pooling operations

## Tech Stack

### Frontend
- React 18.2.0
- Material-UI (MUI) 5.12.3
- React Router DOM 6.11.0
- Axios for API calls
- Formik & Yup for forms
- Chart.js for data visualization
- date-fns for date handling
- React Toastify for notifications
- Socket.io-client for real-time features

### Backend
- Node.js with Express 4.18.2
- MySQL2 with promise support
- JWT for authentication
- Bcrypt.js for password hashing
- Express-validator for validation
- Helmet for security
- Morgan for logging
- CORS for cross-origin requests

## Project Structure

```
carpooling/
├── backend/                 # Node.js backend
│   ├── config/             # Configuration files
│   │   ├── database.js     # MySQL connection
│   │   └── schema.sql      # Database schema
│   ├── middleware/         # Express middleware
│   │   ├── auth.js         # Authentication
│   │   ├── errorHandler.js # Error handling
│   │   └── validation.js   # Validation
│   ├── routes/             # API routes
│   │   ├── auth.js         # Auth endpoints
│   │   ├── rides.js        # Ride endpoints
│   │   ├── bookings.js     # Booking endpoints
│   │   └── users.js        # User endpoints
│   ├── utils/              # Utility functions
│   │   └── jwtUtils.js     # JWT helpers
│   ├── .env.example        # Environment variables template
│   ├── package.json        # Backend dependencies
│   ├── server.js           # Entry point
│   └── README.md           # Backend documentation
├── src/                    # React frontend
│   ├── assets/             # Images, themes, styles
│   ├── components/         # Reusable components
│   ├── layouts/            # Page layouts
│   ├── examples/           # Example components
│   ├── context/            # React context
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
│   └── routes.js           # Frontend routes
├── public/                 # Static files
├── package.json            # Frontend dependencies
├── root-package.json       # Root package for both apps
├── genezio.yaml           # Deployment configuration
└── README.md              # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL Server (v5.7 or higher)
- Git

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd carpooling
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE carpooling_db;
```

2. Import the schema:
```bash
mysql -u your_username -p carpooling_db < backend/config/schema.sql
```

### 5. Environment Configuration

Create a `.env` file in the `backend` directory:
```bash
cd backend
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=carpooling_db

JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
```

## Running the Application

### Option 1: Run Both Frontend and Backend Together

Using the root package.json (requires concurrently):
```bash
# Install concurrently if not already installed
npm install -g concurrently

# Run both servers
npm run dev
```

### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm start
```
Frontend will run on `http://localhost:3000`

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `PUT /api/auth/updatepassword` - Update password

### Ride Endpoints
- `GET /api/rides` - Search rides
- `GET /api/rides/:id` - Get ride details
- `POST /api/rides` - Create ride (auth required)
- `PUT /api/rides/:id` - Update ride (auth required)
- `DELETE /api/rides/:id` - Delete ride (auth required)

### Booking Endpoints
- `GET /api/bookings` - Get user bookings (auth required)
- `POST /api/bookings` - Create booking (auth required)
- `PUT /api/bookings/:id/confirm` - Confirm booking (auth required)
- `PUT /api/bookings/:id/cancel` - Cancel booking (auth required)

### User Endpoints
- `GET /api/users/profile` - Get profile (auth required)
- `PUT /api/users/profile` - Update profile (auth required)
- `POST /api/users/vehicles` - Add vehicle (auth required)
- `GET /api/users/:id` - Get user public profile

For complete API documentation, see [backend/README.md](backend/README.md)

## Database Schema

The application uses the following main tables:
- **users** - User accounts and profiles
- **vehicles** - User vehicles
- **rides** - Ride listings
- **bookings** - Ride bookings
- **reviews** - User reviews and ratings
- **messages** - User messaging
- **notifications** - User notifications
- **transactions** - Payment records

See `backend/config/schema.sql` for complete schema.

## Deployment

### Deploy to Genezio

Click the button below to deploy:

[![Deploy to Genezio](https://raw.githubusercontent.com/Genez-io/graphics/main/svg/deploy-button.svg)](https://app.genez.io/start/deploy?repository=<your-repo-url>)

Or use the Genezio CLI:
```bash
genezio deploy
```

## Development

### Frontend Development
- The frontend uses Material Dashboard 2 React template
- Components are in `src/components/`
- Layouts are in `src/layouts/`
- Theme customization in `src/assets/theme/`

### Backend Development
- API routes are in `backend/routes/`
- Controllers need to be implemented
- Middleware in `backend/middleware/`
- Database queries use MySQL2 with promises

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- SQL injection prevention with parameterized queries
- CORS configuration
- Helmet.js security headers
- Input validation and sanitization
- HTTP-only cookies for tokens

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- Material Dashboard 2 React by Creative Tim
- Material-UI team
- Express.js community
- MySQL team

---

Built with ❤️ for better carpooling experiences
