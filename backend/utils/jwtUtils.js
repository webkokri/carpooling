const jwt = require("jsonwebtoken");

// Generate JWT token
exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Send token response with cookie
exports.sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = this.generateToken(user.id);

  const options = {
    expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  // Remove password from output
  delete user.password;

  res.status(statusCode).cookie("token", token, options).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// Verify token
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
