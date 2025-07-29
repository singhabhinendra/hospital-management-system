const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb://localhost:27017/hospital_management",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/patients", require("./routes/patients"));
app.use("/api/v1/doctors", require("./routes/doctors"));
app.use("/api/v1/appointments", require("./routes/appointments"));
app.use("/api/v1/pharmacy", require("./routes/pharmacy"));
app.use("/api/v1/rooms", require("./routes/rooms"));
app.use("/api/v1/lab", require("./routes/lab"));
app.use("/api/v1/billing", require("./routes/billing"));
app.use("/api/v1/admin", require("./routes/admin"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Hospital Management System API is running",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error"
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🏥 Hospital Management Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});
