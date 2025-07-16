const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
      unique: true,
      default: () => "APT" + Date.now()
    },

    // References
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },

    // Appointment Details
    appointmentDate: {
      type: Date,
      required: true
    },
    appointmentTime: {
      start: { type: String, required: true }, // Format: "HH:MM"
      end: { type: String, required: true }
    },
    duration: {
      type: Number,
      default: 30 // minutes
    },

    // Appointment Type
    type: {
      type: String,
      enum: [
        "consultation",
        "follow-up",
        "emergency",
        "surgery",
        "checkup",
        "vaccination"
      ],
      required: true
    },

    // Status Management
    status: {
      type: String,
      enum: [
        "scheduled",
        "confirmed",
        "in-progress",
        "completed",
        "cancelled",
        "no-show"
      ],
      default: "scheduled"
    },

    // Reason and Symptoms
    reasonForVisit: {
      type: String,
      required: true
    },
    symptoms: [String],

    // Priority
    priority: {
      type: String,
      enum: ["low", "normal", "high", "urgent"],
      default: "normal"
    },

    // Visit Details (filled during/after appointment)
    visitDetails: {
      chiefComplaint: String,
      vitalSigns: {
        temperature: Number, // Fahrenheit
        bloodPressure: {
          systolic: Number,
          diastolic: Number
        },
        heartRate: Number, // bpm
        respiratoryRate: Number, // breaths per minute
        oxygenSaturation: Number, // percentage
        weight: Number, // kg
        height: Number // cm
      },
      diagnosis: String,
      treatmentPlan: String,
      prescriptions: [
        {
          medication: String,
          dosage: String,
          frequency: String,
          duration: String,
          instructions: String
        }
      ],
      labTestsOrdered: [
        {
          testName: String,
          testCode: String,
          urgency: {
            type: String,
            enum: ["routine", "urgent", "stat"],
            default: "routine"
          }
        }
      ],
      followUpInstructions: String,
      nextAppointmentRecommended: Boolean,
      doctorNotes: String
    },

    // Billing
    consultationFee: {
      type: Number,
      required: true
    },
    additionalCharges: [
      {
        description: String,
        amount: Number
      }
    ],
    totalAmount: Number,

    // Insurance
    insuranceClaimed: {
      type: Boolean,
      default: false
    },
    insuranceClaimAmount: Number,

    // Timing
    checkedInAt: Date,
    consultationStartTime: Date,
    consultationEndTime: Date,

    // Cancellation
    cancellationReason: String,
    cancelledBy: {
      type: String,
      enum: ["patient", "doctor", "admin", "system"]
    },
    cancelledAt: Date,

    // Communication
    reminderSent: {
      type: Boolean,
      default: false
    },
    reminderSentAt: Date,

    // Rating (post-appointment)
    patientRating: {
      rating: { type: Number, min: 1, max: 5 },
      feedback: String,
      ratedAt: Date
    }
  },
  {
    timestamps: true
  }
);

// Indexes for better performance
appointmentSchema.index({ appointmentId: 1 });
appointmentSchema.index({ patient: 1 });
appointmentSchema.index({ doctor: 1 });
appointmentSchema.index({ appointmentDate: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ type: 1 });
appointmentSchema.index({ priority: 1 });

// Compound indexes
appointmentSchema.index({ doctor: 1, appointmentDate: 1, status: 1 });
appointmentSchema.index({ patient: 1, appointmentDate: 1 });

// Pre-save middleware to calculate total amount
appointmentSchema.pre("save", function (next) {
  if (
    this.isModified("consultationFee") ||
    this.isModified("additionalCharges")
  ) {
    let total = this.consultationFee || 0;

    if (this.additionalCharges && this.additionalCharges.length > 0) {
      total += this.additionalCharges.reduce(
        (sum, charge) => sum + (charge.amount || 0),
        0
      );
    }

    this.totalAmount = total;
  }
  next();
});

// Virtual for appointment duration in hours
appointmentSchema.virtual("durationInHours").get(function () {
  return this.duration / 60;
});

// Virtual for formatted appointment time
appointmentSchema.virtual("formattedTime").get(function () {
  return `${this.appointmentTime.start} - ${this.appointmentTime.end}`;
});

// Method to check if appointment is upcoming
appointmentSchema.methods.isUpcoming = function () {
  const now = new Date();
  const appointmentDateTime = new Date(this.appointmentDate);
  return appointmentDateTime > now && this.status === "scheduled";
};

// Method to check if appointment can be cancelled
appointmentSchema.methods.canBeCancelled = function () {
  const now = new Date();
  const appointmentDateTime = new Date(this.appointmentDate);
  const hoursUntilAppointment = (appointmentDateTime - now) / (1000 * 60 * 60);

  return (
    hoursUntilAppointment > 2 &&
    ["scheduled", "confirmed"].includes(this.status)
  );
};

// Ensure virtual fields are serialized
appointmentSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Appointment", appointmentSchema);
