const express = require("express");
const { auth, checkPermission } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/v1/pharmacy
// @desc    Get pharmacy inventory
// @access  Private
router.get("/", auth, checkPermission("pharmacy", "read"), async (req, res) => {
  try {
    // Placeholder - implement pharmacy inventory logic
    res.json({
      success: true,
      message: "Pharmacy module - Coming soon",
      data: {
        medicines: [],
        lowStock: [],
        expiring: []
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching pharmacy data"
    });
  }
});

module.exports = router;
