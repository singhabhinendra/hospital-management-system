const express = require("express");
const { auth, checkPermission } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/v1/lab
// @desc    Get lab tests
// @access  Private
router.get("/", auth, checkPermission("lab", "read"), async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Laboratory module - Coming soon",
      data: {
        tests: [],
        pending: [],
        results: []
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching lab data"
    });
  }
});

module.exports = router;
