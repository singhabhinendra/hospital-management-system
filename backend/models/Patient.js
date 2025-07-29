const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    // Personal Information
    patientId: {
      type: String,
      required: true,
      unique: true,
      default: () => "PAT" + Date.now()
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
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },

    // Address
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: "USA" }
    },

    // Emergency Contact
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String
    },

    // Medical Information
    allergies: [
      {
        type: String
      }
    ],
    medicalHistory: [
      {
        condition: String,
        diagnosedDate: Date,
        notes: String
      }
    ],
    currentMedications: [
      {
        medication: String,
        dosage: String,
        frequency: String,
        startDate: Date
      }
    ],

    // Insurance Information
    insurance: {
      provider: String,
      policyNumber: String,
      groupNumber: String,
      validUntil: Date
    },

    // System fields
    status: {
      type: String,
      enum: ["active", "inactive", "discharged"],
      default: "active"
    },
    registrationDate: {
      type: Date,
      default: Date.now
    },
    lastVisit: Date,

    // Avatar/Profile Picture
    avatar: String,

    // Notes
    notes: String
  },
  {
    timestamps: true
  }
);

// Indexes for better performance
patientSchema.index({ patientId: 1 });
patientSchema.index({ email: 1 });
patientSchema.index({ phone: 1 });
patientSchema.index({ firstName: 1, lastName: 1 });

// Virtual for full name
patientSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age calculation
patientSchema.virtual("age").get(function () {
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
});

// Ensure virtual fields are serialized
patientSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Patient", patientSchema);
