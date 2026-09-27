# Hotel List App - Backend

A Node.js + Express.js + PostgreSQL backend for the Hotel List CRUD application.

## Prerequisites

- **Node.js** (v16 or higher)
- **PostgreSQL** (v12 or higher)

## 1. PostgreSQL Database Setup

### Create the database

Open your terminal or pgAdmin and create a new database:

```sql
CREATE DATABASE hotel_db;
```

### Run the seed file

Navigate to the server directory and run the SQL seed file:

```bash
psql -U postgres -d hotel_db -f seed/hotels.sql
```

This will:
- Create the `hotels` table
- Insert 12 dummy hotel records

## 2. Configure Environment Variables

Edit the `.env` file in the `server/` directory:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=hotel_db
```

Replace `your_password_here` with your actual PostgreSQL password.

## 3. Install Dependencies

```bash
cd server
npm install
```

## 4. Start the Backend

**Development mode (with auto-restart):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on `http://localhost:5000` (or whatever PORT you set in `.env`).

## 5. API Endpoints

| Method | Endpoint           | Description          |
|--------|-------------------|----------------------|
| GET    | /api/hotels        | Get all hotels       |
| POST   | /api/hotels        | Create a new hotel   |
| PUT    | /api/hotels/:id    | Update a hotel       |
| DELETE | /api/hotels/:id    | Delete a hotel       |

## 6. GET /api/hotels - Query Parameters

| Parameter | Type   | Description                            | Default |
|-----------|--------|----------------------------------------|---------|
| search    | string | Search hotels by title (case-insensitive) | -     |
| minPrice  | number | Minimum price filter                   | -       |
| maxPrice  | number | Maximum price filter                   | -       |
| offset    | number | Pagination offset                      | 0       |
| limit     | number | Number of results per page             | 6       |

### Example GET Requests

**Get all hotels (default pagination):**
```
GET http://localhost:5000/api/hotels
```

**Search by title:**
```
GET http://localhost:5000/api/hotels?search=palace
```

**Filter by price range:**
```
GET http://localhost:5000/api/hotels?minPrice=100&maxPrice=300
```

**Search with price filter and pagination:**
```
GET http://localhost:5000/api/hotels?search=resort&minPrice=100&maxPrice=500&offset=0&limit=6
```

### Example Response

```json
{
  "hotels": [
    {
      "id": 1,
      "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
      "title": "The Grand Palace Hotel",
      "description": "Experience luxury at The Grand Palace Hotel...",
      "latitude": "28.613900",
      "longitude": "77.209000",
      "price": "250.00"
    }
  ],
  "total": 12,
  "offset": 0,
  "limit": 6
}
```

## 7. POST /api/hotels

Send a `multipart/form-data` request with:

- `image` (file) - Hotel image
- `title` (string) - Hotel title
- `description` (string) - Hotel description
- `latitude` (number) - Latitude
- `longitude` (number) - Longitude
- `price` (number) - Price per night

## 8. PUT /api/hotels/:id

Same fields as POST. Image is optional during update.

## 9. Project Structure

```
server/
├── config/
│   └── db.js              # PostgreSQL connection pool
├── controllers/
│   └── hotelController.js  # CRUD logic with native SQL
├── routes/
│   └── hotelRoutes.js      # Express route definitions
├── middleware/
│   └── upload.js           # Multer image upload config
├── uploads/                # Locally stored uploaded images
├── seed/
│   └── hotels.sql          # Database table & seed data
├── app.js                  # Express app entry point
├── package.json
├── .env                    # Environment variables
└── README.md
```

## Technologies Used

- Node.js
- Express.js
- PostgreSQL (native `pg` package - no ORM)
- Multer (local image upload)
- CORS
- dotenv
