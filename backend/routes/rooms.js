const express = require("express");
const { auth, checkPermission } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/v1/rooms
// @desc    Get room/bed availability
// @access  Private
router.get("/", auth, checkPermission("rooms", "read"), async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Room management module - Coming soon",
      data: {
        wards: [],
        rooms: [],
        beds: [],
        availability: {}
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching room data"
    });
  }
});

module.exports = router;
