const express = require("express");
const Patient = require("../models/Patient");
const { auth, checkPermission } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/v1/patients
// @desc    Get all patients
// @access  Private
router.get("/", auth, checkPermission("patients", "read"), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    const status = req.query.status || "";

    // Build filter object
    let filter = {};

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { patientId: { $regex: search, $options: "i" } }
      ];
    }

    if (status) {
      filter.status = status;
    }

    // Get patients with pagination
    const patients = await Patient.find(filter)
      .select("-medicalHistory -currentMedications -notes") // Exclude sensitive data in list view
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Patient.countDocuments(filter);

    res.json({
      success: true,
      data: {
        patients,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error("Get patients error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching patients",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// @route   GET /api/v1/patients/:id
// @desc    Get patient by ID
// @access  Private
router.get(
  "/:id",
  auth,
  checkPermission("patients", "read"),
  async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);

      if (!patient) {
        return res.status(404).json({
          success: false,
          message: "Patient not found"
        });
      }

      res.json({
        success: true,
        data: { patient }
      });
    } catch (error) {
      console.error("Get patient error:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching patient",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  }
);

// @route   POST /api/v1/patients
// @desc    Create new patient
// @access  Private
router.post(
  "/",
  auth,
  checkPermission("patients", "create"),
  async (req, res) => {
    try {
      const patientData = req.body;

      // Check if patient with email already exists
      const existingPatient = await Patient.findOne({
        email: patientData.email
      });
      if (existingPatient) {
        return res.status(400).json({
          success: false,
          message: "Patient with this email already exists"
        });
      }

      // Create new patient
      const patient = new Patient(patientData);
      await patient.save();

      res.status(201).json({
        success: true,
        message: "Patient created successfully",
        data: { patient }
      });
    } catch (error) {
      console.error("Create patient error:", error);

      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors
        });
      }

      res.status(500).json({
        success: false,
        message: "Error creating patient",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  }
);

// @route   PUT /api/v1/patients/:id
// @desc    Update patient
// @access  Private
router.put(
  "/:id",
  auth,
  checkPermission("patients", "update"),
  async (req, res) => {
    try {
      const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!patient) {
        return res.status(404).json({
          success: false,
          message: "Patient not found"
        });
      }

      res.json({
        success: true,
        message: "Patient updated successfully",
        data: { patient }
      });
    } catch (error) {
      console.error("Update patient error:", error);

      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors
        });
      }

      res.status(500).json({
        success: false,
        message: "Error updating patient",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  }
);

// @route   DELETE /api/v1/patients/:id
// @desc    Delete patient (soft delete)
// @access  Private
router.delete(
  "/:id",
  auth,
  checkPermission("patients", "delete"),
  async (req, res) => {
    try {
      const patient = await Patient.findByIdAndUpdate(
        req.params.id,
        { status: "inactive" },
        { new: true }
      );

      if (!patient) {
        return res.status(404).json({
          success: false,
          message: "Patient not found"
        });
      }

      res.json({
        success: true,
        message: "Patient deactivated successfully",
        data: { patient }
      });
    } catch (error) {
      console.error("Delete patient error:", error);
      res.status(500).json({
        success: false,
        message: "Error deactivating patient",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  }
);

// @route   GET /api/v1/patients/:id/appointments
// @desc    Get patient's appointments
// @access  Private
router.get(
  "/:id/appointments",
  auth,
  checkPermission("patients", "read"),
  async (req, res) => {
    try {
      const Appointment = require("../models/Appointment");

      const appointments = await Appointment.find({ patient: req.params.id })
        .populate("doctor", "firstName lastName specialization")
        .sort({ appointmentDate: -1 });

      res.json({
        success: true,
        data: { appointments }
      });
    } catch (error) {
      console.error("Get patient appointments error:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching patient appointments",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  }
);

// @route   POST /api/v1/patients/:id/medical-history
// @desc    Add medical history entry
// @access  Private
router.post(
  "/:id/medical-history",
  auth,
  checkPermission("patients", "update"),
  async (req, res) => {
    try {
      const { condition, diagnosedDate, notes } = req.body;

      const patient = await Patient.findById(req.params.id);
      if (!patient) {
        return res.status(404).json({
          success: false,
          message: "Patient not found"
        });
      }

      patient.medicalHistory.push({
        condition,
        diagnosedDate,
        notes
      });

      await patient.save();

      res.json({
        success: true,
        message: "Medical history added successfully",
        data: { patient }
      });
    } catch (error) {
      console.error("Add medical history error:", error);
      res.status(500).json({
        success: false,
        message: "Error adding medical history",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  }
);

// @route   GET /api/v1/patients/stats
// @desc    Get patients statistics
// @access  Private
router.get(
  "/stats/overview",
  auth,
  checkPermission("patients", "read"),
  async (req, res) => {
    try {
      const totalPatients = await Patient.countDocuments({ status: "active" });
      const newPatientsThisMonth = await Patient.countDocuments({
        status: "active",
        registrationDate: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      });

      const patientsByGender = await Patient.aggregate([
        { $match: { status: "active" } },
        { $group: { _id: "$gender", count: { $sum: 1 } } }
      ]);

      const patientsByBloodType = await Patient.aggregate([
        { $match: { status: "active", bloodType: { $exists: true } } },
        { $group: { _id: "$bloodType", count: { $sum: 1 } } }
      ]);

      res.json({
        success: true,
        data: {
          totalPatients,
          newPatientsThisMonth,
          patientsByGender,
          patientsByBloodType
        }
      });
    } catch (error) {
      console.error("Get patients stats error:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching patients statistics",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  }
);

module.exports = router;
