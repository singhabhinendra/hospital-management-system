const express = require("express");
const Appointment = require("../models/Appointment");
const { auth, checkPermission } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/v1/appointments
// @desc    Get all appointments
// @access  Private
router.get(
  "/",
  auth,
  checkPermission("appointments", "read"),
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const status = req.query.status || "";
      const date = req.query.date || "";

      let filter = {};
      if (status) filter.status = status;
      if (date) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);
        filter.appointmentDate = { $gte: startDate, $lt: endDate };
      }

      const appointments = await Appointment.find(filter)
        .populate("patient", "firstName lastName patientId phone")
        .populate("doctor", "firstName lastName specialization")
        .sort({ appointmentDate: 1, "appointmentTime.start": 1 })
        .skip(skip)
        .limit(limit);

      const total = await Appointment.countDocuments(filter);

      res.json({
        success: true,
        data: {
          appointments,
          pagination: {
            current: page,
            pages: Math.ceil(total / limit),
            total
          }
        }
      });
    } catch (error) {
      console.error("Get appointments error:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching appointments"
      });
    }
  }
);

// @route   POST /api/v1/appointments
// @desc    Create new appointment
// @access  Private
router.post(
  "/",
  auth,
  checkPermission("appointments", "create"),
  async (req, res) => {
    try {
      const appointmentData = req.body;

      // Check for scheduling conflicts
      const conflictingAppointment = await Appointment.findOne({
        doctor: appointmentData.doctor,
        appointmentDate: appointmentData.appointmentDate,
        $or: [
          {
            "appointmentTime.start": {
              $lt: appointmentData.appointmentTime.end,
              $gte: appointmentData.appointmentTime.start
            }
          },
          {
            "appointmentTime.end": {
              $gt: appointmentData.appointmentTime.start,
              $lte: appointmentData.appointmentTime.end
            }
          }
        ],
        status: { $in: ["scheduled", "confirmed", "in-progress"] }
      });

      if (conflictingAppointment) {
        return res.status(400).json({
          success: false,
          message: "Doctor is not available at the selected time"
        });
      }

      const appointment = new Appointment(appointmentData);
      await appointment.save();

      // Populate references before sending response
      await appointment.populate("patient", "firstName lastName patientId");
      await appointment.populate("doctor", "firstName lastName specialization");

      res.status(201).json({
        success: true,
        message: "Appointment created successfully",
        data: { appointment }
      });
    } catch (error) {
      console.error("Create appointment error:", error);
      res.status(500).json({
        success: false,
        message: "Error creating appointment"
      });
    }
  }
);

// More routes would be implemented here...

module.exports = router;
