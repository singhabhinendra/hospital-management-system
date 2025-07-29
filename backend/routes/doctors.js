const express = require("express");
const Doctor = require("../models/Doctor");
const { auth, checkPermission } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/v1/doctors
// @desc    Get all doctors
// @access  Private
router.get("/", auth, checkPermission("doctors", "read"), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const specialization = req.query.specialization || "";
    const department = req.query.department || "";
    const status = req.query.status || "active";

    // Build filter
    let filter = { status };
    if (specialization) filter.specialization = specialization;
    if (department) filter.department = department;

    const doctors = await Doctor.find(filter)
      .select("-workSchedule -availableSlots")
      .sort({ firstName: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Doctor.countDocuments(filter);

    res.json({
      success: true,
      data: {
        doctors,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching doctors"
    });
  }
});

// @route   GET /api/v1/doctors/:id
// @desc    Get doctor by ID
// @access  Private
router.get(
  "/:id",
  auth,
  checkPermission("doctors", "read"),
  async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.params.id);

      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: "Doctor not found"
        });
      }

      res.json({
        success: true,
        data: { doctor }
      });
    } catch (error) {
      console.error("Get doctor error:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching doctor"
      });
    }
  }
);

// @route   POST /api/v1/doctors
// @desc    Create new doctor
// @access  Private
router.post(
  "/",
  auth,
  checkPermission("doctors", "create"),
  async (req, res) => {
    try {
      const doctorData = req.body;

      // Check if doctor with email already exists
      const existingDoctor = await Doctor.findOne({ email: doctorData.email });
      if (existingDoctor) {
        return res.status(400).json({
          success: false,
          message: "Doctor with this email already exists"
        });
      }

      const doctor = new Doctor(doctorData);
      await doctor.save();

      res.status(201).json({
        success: true,
        message: "Doctor created successfully",
        data: { doctor }
      });
    } catch (error) {
      console.error("Create doctor error:", error);
      res.status(500).json({
        success: false,
        message: "Error creating doctor"
      });
    }
  }
);

// More routes would be implemented here...

module.exports = router;
