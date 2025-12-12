# Car Pooling Backend API

Node.js/Express backend for the Car Pooling application with MySQL database.

## Features

- User authentication with JWT
- Ride management (create, search, update, delete)
- Booking system
- User profiles and vehicle management
- Real-time notifications support
- Secure password hashing with bcrypt
- Input validation with express-validator
- MySQL database with connection pooling

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
   - Database credentials
   - JWT secret
   - Other environment variables

5. Create the database and tables:
```bash
# Login to MySQL
mysql -u your_username -p

# Run the schema file
source config/schema.sql
```

## Running the Server

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in .env)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `PUT /api/auth/updatepassword` - Update password

### Rides
- `GET /api/rides` - Get all rides / Search rides
- `GET /api/rides/:id` - Get ride by ID
- `POST /api/rides` - Create new ride (auth required)
- `PUT /api/rides/:id` - Update ride (auth required)
- `DELETE /api/rides/:id` - Delete ride (auth required)
- `GET /api/rides/user/my-rides` - Get user's rides (auth required)

### Bookings
- `GET /api/bookings` - Get user's bookings (auth required)
- `GET /api/bookings/:id` - Get booking by ID (auth required)
- `POST /api/bookings` - Create booking (auth required)
- `PUT /api/bookings/:id/confirm` - Confirm booking (auth required)
- `PUT /api/bookings/:id/cancel` - Cancel booking (auth required)
- `PUT /api/bookings/:id/complete` - Complete booking (auth required)
- `GET /api/bookings/ride/:rideId` - Get ride bookings (auth required)

### Users
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/profile` - Update profile (auth required)
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/:id/reviews` - Get user reviews
- `GET /api/users/:id/vehicles` - Get user vehicles
- `POST /api/users/vehicles` - Add vehicle (auth required)
- `PUT /api/users/vehicles/:vehicleId` - Update vehicle (auth required)
- `DELETE /api/users/vehicles/:vehicleId` - Delete vehicle (auth required)

## Project Structure

```
backend/
├── config/
│   ├── database.js       # MySQL connection configuration
│   └── schema.sql        # Database schema
├── middleware/
│   ├── auth.js          # Authentication middleware
│   ├── errorHandler.js  # Error handling middleware
│   └── validation.js    # Validation middleware
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── rides.js         # Ride routes
│   ├── bookings.js      # Booking routes
│   └── users.js         # User routes
├── utils/
│   └── jwtUtils.js      # JWT utility functions
├── .env.example         # Environment variables example
├── package.json         # Dependencies
├── server.js            # Entry point
└── README.md           # This file
```

## Environment Variables

See `.env.example` for all required environment variables.

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Helmet.js for security headers
- CORS configuration
- Input validation and sanitization
- SQL injection prevention with parameterized queries

## Database Schema

The database includes the following tables:
- `users` - User accounts
- `vehicles` - User vehicles
- `rides` - Ride listings
- `bookings` - Ride bookings
- `reviews` - User reviews
- `messages` - User messages
- `notifications` - User notifications
- `transactions` - Payment transactions

See `config/schema.sql` for complete schema details.

## Development

Controllers for each route need to be implemented. The current routes return 501 (Not Implemented) status codes as placeholders.

## License

ISC
