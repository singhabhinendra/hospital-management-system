const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { auth } = require("../middleware/auth");

const router = express.Router();

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || "hospital_management_secret_key";

// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public (but in real system, should be admin only)
router.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
      department,
      position
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or username already exists"
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
      department,
      position,
      hireDate: new Date()
    });

    // Set default permissions based on role
    const defaultPermissions = {
      admin: [
        { module: "patients", actions: ["create", "read", "update", "delete"] },
        { module: "doctors", actions: ["create", "read", "update", "delete"] },
        {
          module: "appointments",
          actions: ["create", "read", "update", "delete"]
        },
        { module: "pharmacy", actions: ["create", "read", "update", "delete"] },
        { module: "lab", actions: ["create", "read", "update", "delete"] },
        { module: "billing", actions: ["create", "read", "update", "delete"] },
        { module: "rooms", actions: ["create", "read", "update", "delete"] },
        { module: "reports", actions: ["create", "read", "update", "delete"] },
        { module: "admin", actions: ["create", "read", "update", "delete"] }
      ],
      doctor: [
        { module: "patients", actions: ["read", "update"] },
        { module: "appointments", actions: ["read", "update"] },
        { module: "lab", actions: ["create", "read"] }
      ],
      nurse: [
        { module: "patients", actions: ["read", "update"] },
        { module: "appointments", actions: ["read", "update"] },
        { module: "rooms", actions: ["read", "update"] }
      ],
      receptionist: [
        { module: "patients", actions: ["create", "read", "update"] },
        { module: "appointments", actions: ["create", "read", "update"] }
      ],
      lab_technician: [
        { module: "lab", actions: ["read", "update"] },
        { module: "patients", actions: ["read"] }
      ],
      pharmacist: [
        { module: "pharmacy", actions: ["create", "read", "update"] },
        { module: "patients", actions: ["read"] }
      ],
      accountant: [
        { module: "billing", actions: ["create", "read", "update"] },
        { module: "patients", actions: ["read"] },
        { module: "reports", actions: ["read"] }
      ]
    };

    user.permissions = defaultPermissions[role] || [];

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "24h"
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          department: user.department,
          employeeId: user.employeeId
        },
        token
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// @route   POST /api/v1/auth/login
// @desc    Login user
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        message:
          "Account is temporarily locked due to multiple failed login attempts"
      });
    }

    // Check if account is active
    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Account is not active. Please contact administrator."
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      await user.incLoginAttempts();
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "24h"
    });

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          department: user.department,
          employeeId: user.employeeId,
          permissions: user.permissions,
          lastLogin: user.lastLogin
        },
        token
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// @route   GET /api/v1/auth/me
// @desc    Get current user profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          department: user.department,
          employeeId: user.employeeId,
          permissions: user.permissions,
          status: user.status,
          avatar: user.avatar,
          preferences: user.preferences
        }
      }
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching profile",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// @route   POST /api/v1/auth/logout
// @desc    Logout user
// @access  Private
router.post("/logout", auth, async (req, res) => {
  try {
    // In a more complex system, you would invalidate the token
    // For now, we'll just send a success response
    res.json({
      success: true,
      message: "Logout successful"
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during logout",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

module.exports = router;
