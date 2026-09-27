const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

// GET /api/hotels - Get all hotels with search, filter, pagination
router.get("/", getHotels);

// POST /api/hotels - Create a new hotel (with image upload)
router.post("/", upload.single("image"), createHotel);

// PUT /api/hotels/:id - Update a hotel (with optional image upload)
router.put("/:id", upload.single("image"), updateHotel);

// DELETE /api/hotels/:id - Delete a hotel
router.delete("/:id", deleteHotel);

module.exports = router;
