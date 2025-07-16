const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    // Personal Information
    employeeId: {
      type: String,
      required: true,
      unique: true,
      default: () => "DOC" + Date.now()
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true
    },

    // Professional Information
    specialization: {
      type: String,
      required: true,
      enum: [
        "Cardiology",
        "Dermatology",
        "Emergency Medicine",
        "Endocrinology",
        "Gastroenterology",
        "General Practice",
        "Hematology",
        "Infectious Disease",
        "Internal Medicine",
        "Nephrology",
        "Neurology",
        "Oncology",
        "Ophthalmology",
        "Orthopedics",
        "Otolaryngology",
        "Pediatrics",
        "Psychiatry",
        "Pulmonology",
        "Radiology",
        "Rheumatology",
        "Surgery",
        "Urology",
        "Anesthesiology",
        "Pathology"
      ]
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true
    },
    department: {
      type: String,
      required: true
    },
    position: {
      type: String,
      enum: [
        "Junior Doctor",
        "Senior Doctor",
        "Consultant",
        "Head of Department",
        "Chief Medical Officer"
      ],
      default: "Junior Doctor"
    },

    // Education & Certifications
    education: [
      {
        degree: String,
        institution: String,
        year: Number,
        specialization: String
      }
    ],
    certifications: [
      {
        name: String,
        issuingBody: String,
        issueDate: Date,
        expiryDate: Date
      }
    ],

    // Work Information
    joinDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    workSchedule: {
      monday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true }
      },
      tuesday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true }
      },
      wednesday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true }
      },
      thursday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true }
      },
      friday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true }
      },
      saturday: {
        start: String,
        end: String,
        available: { type: Boolean, default: false }
      },
      sunday: {
        start: String,
        end: String,
        available: { type: Boolean, default: false }
      }
    },
    consultationFee: {
      type: Number,
      required: true,
      default: 100
    },

    // Contact Information
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: "USA" }
    },

    // Professional Details
    biography: String,
    languages: [String],
    awards: [
      {
        title: String,
        year: Number,
        description: String
      }
    ],

    // Availability
    availableSlots: [
      {
        date: Date,
        timeSlots: [
          {
            startTime: String,
            endTime: String,
            isBooked: { type: Boolean, default: false },
            appointmentId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Appointment"
            }
          }
        ]
      }
    ],

    // System fields
    status: {
      type: String,
      enum: ["active", "inactive", "on_leave", "terminated"],
      default: "active"
    },
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 }
    },

    // Profile Picture
    avatar: String,

    // Statistics
    totalPatients: { type: Number, default: 0 },
    totalAppointments: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

// Indexes
doctorSchema.index({ employeeId: 1 });
doctorSchema.index({ email: 1 });
doctorSchema.index({ specialization: 1 });
doctorSchema.index({ department: 1 });
doctorSchema.index({ status: 1 });

// Virtual for full name
doctorSchema.virtual("fullName").get(function () {
  return `Dr. ${this.firstName} ${this.lastName}`;
});

// Virtual for experience years
doctorSchema.virtual("experienceYears").get(function () {
  const today = new Date();
  const joinDate = new Date(this.joinDate);
  return Math.floor((today - joinDate) / (365.25 * 24 * 60 * 60 * 1000));
});

// Ensure virtual fields are serialized
doctorSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Doctor", doctorSchema);
