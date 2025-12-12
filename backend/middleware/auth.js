const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database
      const [users] = await pool.query(
        'SELECT id, email, first_name, last_name, is_active FROM users WHERE id = ?',
        [decoded.id]
      );

      if (users.length === 0) {
        return res.status(401).json({
          status: 'error',
          message: 'User not found'
        });
      }

      if (!users[0].is_active) {
        return res.status(401).json({
          status: 'error',
          message: 'User account is deactivated'
        });
      }

      // Add user to request object
      req.user = users[0];
      next();
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid or expired token'
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Server error during authentication'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'User role is not authorized to access this route'
      });
    }
    next();
  };
};

// Optional authentication - doesn't fail if no token
exports.optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [users] = await pool.query(
          'SELECT id, email, first_name, last_name FROM users WHERE id = ? AND is_active = true',
          [decoded.id]
        );

        if (users.length > 0) {
          req.user = users[0];
        }
      } catch (error) {
        // Token invalid, but continue without user
      }
    }

    next();
  } catch (error) {
    next();
  }
};
