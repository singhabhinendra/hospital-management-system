const express = require("express");
const { auth, authorize, checkPermission } = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// @route   GET /api/v1/admin/users
// @desc    Get all users (admin only)
// @access  Private (Admin)
router.get("/users", auth, authorize("admin"), async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -refreshTokens")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { users }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users"
    });
  }
});

// @route   GET /api/v1/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Private (Admin)
router.get("/dashboard", auth, authorize("admin"), async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Admin dashboard - Coming soon",
      data: {
        stats: {
          totalUsers: 0,
          totalPatients: 0,
          totalDoctors: 0,
          todayAppointments: 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching admin data"
    });
  }
});

module.exports = router;
