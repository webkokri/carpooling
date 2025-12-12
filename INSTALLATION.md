# Installation Guide - Car Pooling Application

This guide will help you set up and run the Car Pooling application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MySQL Server** (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download](https://git-scm.com/downloads)

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd carpooling
```

### 2. Install Frontend Dependencies

```bash
npm install
```

This will install all React frontend dependencies including:
- React, Material-UI, React Router
- Axios, Formik, date-fns
- Chart.js, React Toastify, Socket.io-client

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

This will install all Node.js backend dependencies including:
- Express, MySQL2, JWT
- Bcrypt, CORS, Helmet
- Express-validator, Morgan

### 4. Database Setup

#### Option A: Using MySQL Command Line

1. **Login to MySQL:**
```bash
mysql -u root -p
```

2. **Create the database:**
```sql
CREATE DATABASE carpooling_db;
USE carpooling_db;
```

3. **Import the schema:**
```sql
source backend/config/schema.sql;
```

4. **Verify tables were created:**
```sql
SHOW TABLES;
```

You should see: users, vehicles, rides, bookings, reviews, messages, notifications, transactions

5. **Exit MySQL:**
```sql
EXIT;
```

#### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Create a new schema named `carpooling_db`
4. Open the file `backend/config/schema.sql`
5. Execute the SQL script

### 5. Configure Environment Variables

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Copy the example environment file:**
```bash
cp .env.example .env
```

3. **Edit the .env file with your configuration:**
```bash
# Use your preferred text editor
nano .env
# or
code .env
```

4. **Update the following variables:**
```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database Configuration (UPDATE THESE!)
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=carpooling_db

# JWT Configuration (CHANGE THIS SECRET!)
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
```

**Important:** 
- Replace `your_mysql_username` with your MySQL username (usually `root`)
- Replace `your_mysql_password` with your MySQL password
- Change `JWT_SECRET` to a random secure string

5. **Return to root directory:**
```bash
cd ..
```

### 6. Verify Installation

#### Test Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
🚗 Car Pooling API Server running on port 5000
📍 Environment: development
✅ MySQL Database connected successfully
```

If you see the database connection message, your setup is correct!

**Test the API:**
Open your browser and visit: `http://localhost:5000/api/health`

You should see:
```json
{
  "status": "success",
  "message": "Car Pooling API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Keep this terminal running.

#### Test Frontend Server

Open a **new terminal** and run:

```bash
npm start
```

The React app should open automatically at `http://localhost:3000`

## Running the Application

### Option 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm start
```

### Option 2: Run Both Servers Together

If you have `concurrently` installed:

```bash
npm run dev
```

This will start both frontend and backend simultaneously.

## Troubleshooting

### Database Connection Issues

**Error: "ER_ACCESS_DENIED_ERROR"**
- Check your MySQL username and password in `.env`
- Ensure MySQL server is running

**Error: "ER_BAD_DB_ERROR"**
- Make sure you created the database: `CREATE DATABASE carpooling_db;`
- Check the database name in `.env` matches

**Error: "ECONNREFUSED"**
- MySQL server is not running
- Start MySQL: 
  - Windows: Start MySQL service from Services
  - Mac: `mysql.server start`
  - Linux: `sudo service mysql start`

### Port Already in Use

**Frontend (Port 3000):**
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

**Backend (Port 5000):**
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

### MySQL Connection Timeout

If you're using a remote MySQL server:
- Check firewall settings
- Verify the host address is correct
- Ensure the MySQL user has remote access permissions

## Testing the API

### Using cURL

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "1234567890"
  }'
```

### Using Postman or Thunder Client

1. Import the API endpoints
2. Set base URL: `http://localhost:5000`
3. Test each endpoint according to the API documentation

## Next Steps

After successful installation:

1. **Implement Controllers** - Add business logic to route handlers
2. **Build Frontend Pages** - Create car pooling specific pages
3. **Connect Frontend to Backend** - Use Axios to call API endpoints
4. **Add Authentication** - Implement login/register flows
5. **Test Features** - Test ride creation, booking, etc.

## Additional Resources

- [Backend API Documentation](backend/README.md)
- [Main README](README.md)
- [TODO List](TODO.md)

## Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Review error messages carefully
3. Check MySQL and Node.js logs
4. Ensure all prerequisites are installed correctly

## Success Checklist

- [ ] Node.js and npm installed
- [ ] MySQL server installed and running
- [ ] Repository cloned
- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] Database created and schema imported
- [ ] .env file configured
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Database connection successful
- [ ] API health check returns success

Once all items are checked, you're ready to start developing! 🚀
