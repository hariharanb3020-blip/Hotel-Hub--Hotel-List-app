const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const hotelRoutes = require("./routes/hotelRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/hotels", hotelRoutes);

// Simple error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  // Handle multer errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "File size too large. Maximum 5MB allowed." });
  }

  if (err.message && err.message.includes("Only image files")) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal server error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
