const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import models
const User = require("./models/User");
const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb://localhost:27017/hospital_management",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("✅ MongoDB Connected for seeding");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

// Sample data
const sampleUsers = [
  {
    username: "admin",
    email: "admin@hospital.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    phone: "+1-555-0101",
    role: "admin",
    department: "Administration",
    position: "System Administrator",
    permissions: [
      { module: "patients", actions: ["create", "read", "update", "delete"] },
      { module: "doctors", actions: ["create", "read", "update", "delete"] },
      {
        module: "appointments",
        actions: ["create", "read", "update", "delete"]
      },
      { module: "pharmacy", actions: ["create", "read", "update", "delete"] },
      { module: "lab", actions: ["create", "read", "update", "delete"] },
      { module: "billing", actions: ["create", "read", "update", "delete"] },
      { module: "rooms", actions: ["create", "read", "update", "delete"] },
      { module: "reports", actions: ["create", "read", "update", "delete"] },
      { module: "admin", actions: ["create", "read", "update", "delete"] }
    ]
  },
  {
    username: "doctor_smith",
    email: "doctor@hospital.com",
    password: "doctor123",
    firstName: "John",
    lastName: "Smith",
    phone: "+1-555-0102",
    role: "doctor",
    department: "Cardiology",
    position: "Senior Doctor",
    permissions: [
      { module: "patients", actions: ["read", "update"] },
      { module: "appointments", actions: ["read", "update"] },
      { module: "lab", actions: ["create", "read"] }
    ]
  },
  {
    username: "nurse_jane",
    email: "nurse@hospital.com",
    password: "nurse123",
    firstName: "Jane",
    lastName: "Doe",
    phone: "+1-555-0103",
    role: "nurse",
    department: "General Practice",
    position: "Head Nurse",
    permissions: [
      { module: "patients", actions: ["read", "update"] },
      { module: "appointments", actions: ["read", "update"] },
      { module: "rooms", actions: ["read", "update"] }
    ]
  },
  {
    username: "receptionist",
    email: "reception@hospital.com",
    password: "reception123",
    firstName: "Mary",
    lastName: "Johnson",
    phone: "+1-555-0104",
    role: "receptionist",
    department: "Administration",
    position: "Front Desk",
    permissions: [
      { module: "patients", actions: ["create", "read", "update"] },
      { module: "appointments", actions: ["create", "read", "update"] }
    ]
  }
];

const samplePatients = [
  {
    firstName: "Alice",
    lastName: "Brown",
    email: "alice.brown@email.com",
    phone: "+1-555-0201",
    dateOfBirth: new Date("1985-03-15"),
    gender: "female",
    bloodType: "A+",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    emergencyContact: {
      name: "Bob Brown",
      relationship: "Husband",
      phone: "+1-555-0202"
    },
    allergies: ["Penicillin", "Peanuts"],
    insurance: {
      provider: "Blue Cross",
      policyNumber: "BC123456789",
      groupNumber: "GRP001",
      validUntil: new Date("2024-12-31")
    }
  },
  {
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@email.com",
    phone: "+1-555-0203",
    dateOfBirth: new Date("1978-08-22"),
    gender: "male",
    bloodType: "O-",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA"
    },
    emergencyContact: {
      name: "Sarah Wilson",
      relationship: "Wife",
      phone: "+1-555-0204"
    },
    allergies: ["Shellfish"],
    medicalHistory: [
      {
        condition: "Hypertension",
        diagnosedDate: new Date("2020-01-15"),
        notes: "Controlled with medication"
      }
    ]
  },
  {
    firstName: "Emma",
    lastName: "Davis",
    email: "emma.davis@email.com",
    phone: "+1-555-0205",
    dateOfBirth: new Date("1992-11-08"),
    gender: "female",
    bloodType: "B+",
    address: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    },
    emergencyContact: {
      name: "Michael Davis",
      relationship: "Brother",
      phone: "+1-555-0206"
    },
    allergies: []
  }
];

const sampleDoctors = [
  {
    firstName: "Robert",
    lastName: "Johnson",
    email: "dr.johnson@hospital.com",
    phone: "+1-555-0301",
    dateOfBirth: new Date("1975-06-12"),
    gender: "male",
    specialization: "Cardiology",
    licenseNumber: "LIC123456",
    department: "Cardiology",
    position: "Senior Doctor",
    education: [
      {
        degree: "MD",
        institution: "Harvard Medical School",
        year: 2000,
        specialization: "Cardiology"
      }
    ],
    consultationFee: 200,
    workSchedule: {
      monday: { start: "09:00", end: "17:00", available: true },
      tuesday: { start: "09:00", end: "17:00", available: true },
      wednesday: { start: "09:00", end: "17:00", available: true },
      thursday: { start: "09:00", end: "17:00", available: true },
      friday: { start: "09:00", end: "17:00", available: true },
      saturday: { start: "09:00", end: "13:00", available: true },
      sunday: { start: "", end: "", available: false }
    },
    biography:
      "Dr. Johnson is a board-certified cardiologist with over 20 years of experience.",
    languages: ["English", "Spanish"]
  },
  {
    firstName: "Sarah",
    lastName: "Williams",
    email: "dr.williams@hospital.com",
    phone: "+1-555-0302",
    dateOfBirth: new Date("1980-09-25"),
    gender: "female",
    specialization: "Pediatrics",
    licenseNumber: "LIC789012",
    department: "Pediatrics",
    position: "Consultant",
    education: [
      {
        degree: "MD",
        institution: "Johns Hopkins University",
        year: 2005,
        specialization: "Pediatrics"
      }
    ],
    consultationFee: 150,
    workSchedule: {
      monday: { start: "08:00", end: "16:00", available: true },
      tuesday: { start: "08:00", end: "16:00", available: true },
      wednesday: { start: "08:00", end: "16:00", available: true },
      thursday: { start: "08:00", end: "16:00", available: true },
      friday: { start: "08:00", end: "16:00", available: true },
      saturday: { start: "", end: "", available: false },
      sunday: { start: "", end: "", available: false }
    },
    biography:
      "Dr. Williams specializes in pediatric care and has a passion for helping children.",
    languages: ["English", "French"]
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Doctor.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create users
    console.log("👥 Creating users...");
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created user: ${user.fullName} (${user.role})`);
    }

    // Create patients
    console.log("🏥 Creating patients...");
    for (const patientData of samplePatients) {
      const patient = new Patient(patientData);
      await patient.save();
      console.log(`✅ Created patient: ${patient.fullName}`);
    }

    // Create doctors
    console.log("👨‍⚕️ Creating doctors...");
    for (const doctorData of sampleDoctors) {
      const doctor = new Doctor(doctorData);
      await doctor.save();
      console.log(
        `✅ Created doctor: ${doctor.fullName} (${doctor.specialization})`
      );
    }

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📝 Login Credentials:");
    console.log("Admin: admin@hospital.com / admin123");
    console.log("Doctor: doctor@hospital.com / doctor123");
    console.log("Nurse: nurse@hospital.com / nurse123");
    console.log("Receptionist: reception@hospital.com / reception123");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

// Run the seeding
const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();
