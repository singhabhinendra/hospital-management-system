const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "hospital_management_secret_key";

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if user still exists and is active
    const user = await User.findById(decoded.userId);

    if (!user || user.status !== "active") {
      return res.status(401).json({
        success: false,
        message: "Token is no longer valid"
      });
    }

    // Add user info to request object
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      user: user
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired"
      });
    }

    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error in authentication"
    });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient permissions"
      });
    }

    next();
  };
};

// Permission-based authorization middleware
const checkPermission = (module, action) => {
  return (req, res, next) => {
    if (!req.user || !req.user.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    // Admin has all permissions
    if (req.user.role === "admin") {
      return next();
    }

    // Check if user has the required permission
    const hasPermission = req.user.user.hasPermission(module, action);

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: `Access denied: ${action} permission required for ${module} module`
      });
    }

    next();
  };
};

module.exports = {
  auth,
  authorize,
  checkPermission
};
