const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },

    // Personal Information
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
    phone: {
      type: String,
      required: true
    },

    // Role and Permissions
    role: {
      type: String,
      enum: [
        "admin",
        "doctor",
        "nurse",
        "receptionist",
        "lab_technician",
        "pharmacist",
        "accountant"
      ],
      required: true
    },
    permissions: [
      {
        module: {
          type: String,
          enum: [
            "patients",
            "doctors",
            "appointments",
            "pharmacy",
            "lab",
            "billing",
            "rooms",
            "reports",
            "admin"
          ]
        },
        actions: [
          {
            type: String,
            enum: ["create", "read", "update", "delete", "approve"]
          }
        ]
      }
    ],

    // Department (for staff)
    department: {
      type: String,
      enum: [
        "Administration",
        "Cardiology",
        "Dermatology",
        "Emergency",
        "Endocrinology",
        "Gastroenterology",
        "General Practice",
        "Hematology",
        "Infectious Disease",
        "Internal Medicine",
        "Laboratory",
        "Nephrology",
        "Neurology",
        "Oncology",
        "Ophthalmology",
        "Orthopedics",
        "Otolaryngology",
        "Pediatrics",
        "Pharmacy",
        "Psychiatry",
        "Pulmonology",
        "Radiology",
        "Rheumatology",
        "Surgery",
        "Urology",
        "Anesthesiology",
        "Pathology",
        "Billing"
      ]
    },

    // Employee Information
    employeeId: {
      type: String,
      unique: true,
      sparse: true // Allows null values but enforces uniqueness when present
    },
    position: String,
    salary: {
      type: Number,
      select: false // Don't include in queries by default
    },
    hireDate: Date,

    // Account Status
    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "terminated"],
      default: "active"
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },

    // Security
    lastLogin: Date,
    loginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: Date,

    // Password Reset
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // Email Verification
    emailVerificationToken: String,
    emailVerificationExpire: Date,

    // Profile
    avatar: String,
    bio: String,

    // Preferences
    preferences: {
      theme: { type: String, enum: ["light", "dark"], default: "light" },
      language: { type: String, default: "en" },
      timezone: { type: String, default: "UTC" },
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        push: { type: Boolean, default: true }
      }
    },

    // Two-Factor Authentication
    twoFactorEnabled: {
      type: Boolean,
      default: false
    },
    twoFactorSecret: String,

    // Session Management
    refreshTokens: [
      {
        token: String,
        createdAt: { type: Date, default: Date.now },
        expiresAt: Date,
        isActive: { type: Boolean, default: true }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });
userSchema.index({ department: 1 });
userSchema.index({ status: 1 });
userSchema.index({ employeeId: 1 });

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for account locked status
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to handle failed login attempts
userSchema.methods.incLoginAttempts = function () {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  // If we're at max attempts and not locked yet, lock account
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }

  return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Method to check if user has permission
userSchema.methods.hasPermission = function (module, action) {
  if (this.role === "admin") return true; // Admin has all permissions

  const permission = this.permissions.find((p) => p.module === module);
  return permission && permission.actions.includes(action);
};

// Method to generate employee ID
userSchema.methods.generateEmployeeId = function () {
  const rolePrefix = {
    admin: "ADM",
    doctor: "DOC",
    nurse: "NUR",
    receptionist: "REC",
    lab_technician: "LAB",
    pharmacist: "PHR",
    accountant: "ACC"
  };

  const prefix = rolePrefix[this.role] || "EMP";
  const timestamp = Date.now().toString().slice(-6);
  return `${prefix}${timestamp}`;
};

// Pre-save middleware to generate employee ID
userSchema.pre("save", function (next) {
  if (this.isNew && !this.employeeId) {
    this.employeeId = this.generateEmployeeId();
  }
  next();
});

// Ensure virtual fields are serialized
userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.resetPasswordToken;
    delete ret.emailVerificationToken;
    delete ret.twoFactorSecret;
    delete ret.refreshTokens;
    return ret;
  }
});

module.exports = mongoose.model("User", userSchema);
