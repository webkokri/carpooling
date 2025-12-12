-- Car Pooling Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS carpooling_db;
USE carpooling_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  profile_image VARCHAR(255),
  date_of_birth DATE,
  gender ENUM('male', 'female', 'other'),
  bio TEXT,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_rides_offered INT DEFAULT 0,
  total_rides_taken INT DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_is_active (is_active)
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  color VARCHAR(50),
  license_plate VARCHAR(20) UNIQUE NOT NULL,
  seats INT NOT NULL,
  vehicle_type ENUM('sedan', 'suv', 'hatchback', 'van', 'other') DEFAULT 'sedan',
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_is_active (is_active)
);

-- Rides table
CREATE TABLE IF NOT EXISTS rides (
  id INT PRIMARY KEY AUTO_INCREMENT,
  driver_id INT NOT NULL,
  vehicle_id INT NOT NULL,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  origin_lat DECIMAL(10, 8),
  origin_lng DECIMAL(11, 8),
  destination_lat DECIMAL(10, 8),
  destination_lng DECIMAL(11, 8),
  departure_time DATETIME NOT NULL,
  arrival_time DATETIME,
  available_seats INT NOT NULL,
  price_per_seat DECIMAL(10, 2) NOT NULL,
  distance_km DECIMAL(10, 2),
  duration_minutes INT,
  status ENUM('scheduled', 'in_progress', 'completed', 'cancelled') DEFAULT 'scheduled',
  notes TEXT,
  preferences TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
  INDEX idx_driver_id (driver_id),
  INDEX idx_departure_time (departure_time),
  INDEX idx_status (status),
  INDEX idx_origin_destination (origin, destination)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ride_id INT NOT NULL,
  passenger_id INT NOT NULL,
  seats_booked INT NOT NULL DEFAULT 1,
  total_price DECIMAL(10, 2) NOT NULL,
  pickup_location VARCHAR(255),
  pickup_lat DECIMAL(10, 8),
  pickup_lng DECIMAL(11, 8),
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
  payment_method VARCHAR(50),
  booking_notes TEXT,
  cancellation_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ride_id) REFERENCES rides(id) ON DELETE CASCADE,
  FOREIGN KEY (passenger_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_ride_id (ride_id),
  INDEX idx_passenger_id (passenger_id),
  INDEX idx_status (status),
  UNIQUE KEY unique_booking (ride_id, passenger_id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT NOT NULL,
  reviewer_id INT NOT NULL,
  reviewee_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  review_type ENUM('driver', 'passenger') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewee_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_reviewee_id (reviewee_id),
  INDEX idx_review_type (review_type),
  UNIQUE KEY unique_review (booking_id, reviewer_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  ride_id INT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (ride_id) REFERENCES rides(id) ON DELETE SET NULL,
  INDEX idx_sender_receiver (sender_id, receiver_id),
  INDEX idx_ride_id (ride_id),
  INDEX idx_is_read (is_read)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  related_id INT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_is_read (is_read)
);

-- Payment transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT NOT NULL,
  user_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  transaction_type ENUM('payment', 'refund') NOT NULL,
  payment_method VARCHAR(50),
  transaction_id VARCHAR(255) UNIQUE,
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_booking_id (booking_id),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
);
