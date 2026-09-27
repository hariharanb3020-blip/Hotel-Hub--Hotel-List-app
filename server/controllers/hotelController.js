const pool = require("../config/db");
const fs = require("fs");
const path = require("path");

// ============================================
// GET /api/hotels
// Supports: search, minPrice, maxPrice, offset, limit
// ============================================
const getHotels = async (req, res) => {
  try {
    const { search, minPrice, maxPrice, offset, limit } = req.query;

    // Default pagination values
    const queryLimit = parseInt(limit) || 6;
    const queryOffset = parseInt(offset) || 0;

    // Build dynamic WHERE clause with parameterized queries
    const conditions = [];
    const values = [];
    let paramIndex = 1;

    if (search) {
      conditions.push(`title ILIKE $${paramIndex}`);
      values.push(`%${search}%`);
      paramIndex++;
    }

    if (minPrice) {
      conditions.push(`price >= $${paramIndex}`);
      values.push(parseFloat(minPrice));
      paramIndex++;
    }

    if (maxPrice) {
      conditions.push(`price <= $${paramIndex}`);
      values.push(parseFloat(maxPrice));
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // Get total count of matching hotels (before pagination)
    const countQuery = `SELECT COUNT(*) FROM hotels ${whereClause}`;
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated hotels
    const dataQuery = `SELECT * FROM hotels ${whereClause} ORDER BY id ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    values.push(queryLimit, queryOffset);
    const dataResult = await pool.query(dataQuery, values);

    res.status(200).json({
      hotels: dataResult.rows,
      total,
      offset: queryOffset,
      limit: queryLimit,
    });
  } catch (error) {
    console.error("Error fetching hotels:", error.message);
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
};

// ============================================
// POST /api/hotels
// Create a new hotel
// ============================================
const createHotel = async (req, res) => {
  try {
    const { title, description, latitude, longitude, price } = req.body;

    // Validate required fields
    if (!title || !description || latitude === undefined || longitude === undefined || price === undefined) {
      return res.status(400).json({ error: "All fields are required: title, description, latitude, longitude, price" });
    }

    // Get image path from uploaded file
    let image = "";
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const query = `
      INSERT INTO hotels (image, title, description, latitude, longitude, price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [image, title, description, parseFloat(latitude), parseFloat(longitude), parseFloat(price)];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating hotel:", error.message);
    res.status(500).json({ error: "Failed to create hotel" });
  }
};

// ============================================
// PUT /api/hotels/:id
// Update an existing hotel
// ============================================
const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, latitude, longitude, price } = req.body;

    // Check if hotel exists
    const findQuery = "SELECT * FROM hotels WHERE id = $1";
    const findResult = await pool.query(findQuery, [id]);

    if (findResult.rows.length === 0) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const existingHotel = findResult.rows[0];

    // Determine the image path
    let image = existingHotel.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;

      // Optionally delete old local image file
      if (existingHotel.image && existingHotel.image.startsWith("/uploads/")) {
        const oldImagePath = path.join(__dirname, "..", existingHotel.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const query = `
      UPDATE hotels
      SET image = $1, title = $2, description = $3, latitude = $4, longitude = $5, price = $6
      WHERE id = $7
      RETURNING *
    `;
    const values = [
      image,
      title || existingHotel.title,
      description || existingHotel.description,
      latitude !== undefined ? parseFloat(latitude) : existingHotel.latitude,
      longitude !== undefined ? parseFloat(longitude) : existingHotel.longitude,
      price !== undefined ? parseFloat(price) : existingHotel.price,
      id,
    ];
    const result = await pool.query(query, values);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating hotel:", error.message);
    res.status(500).json({ error: "Failed to update hotel" });
  }
};

// ============================================
// DELETE /api/hotels/:id
// Delete a hotel
// ============================================
const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the hotel first
    const findQuery = "SELECT * FROM hotels WHERE id = $1";
    const findResult = await pool.query(findQuery, [id]);

    if (findResult.rows.length === 0) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const hotel = findResult.rows[0];

    // Delete the database record
    const deleteQuery = "DELETE FROM hotels WHERE id = $1";
    await pool.query(deleteQuery, [id]);

    // Optionally delete the local image file
    if (hotel.image && hotel.image.startsWith("/uploads/")) {
      const imagePath = path.join(__dirname, "..", hotel.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Error deleting hotel:", error.message);
    res.status(500).json({ error: "Failed to delete hotel" });
  }
};

module.exports = {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
};
