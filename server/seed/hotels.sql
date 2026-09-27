-- =============================================
-- Hotel List App - Database Setup
-- =============================================
-- Run this file to create the hotels table and
-- insert 12 dummy hotel records.
--
-- Usage:
--   psql -U postgres -d hotel_db -f hotels.sql
-- =============================================

-- Drop table if it already exists (for re-seeding)
DROP TABLE IF EXISTS hotels;

-- Create the hotels table
CREATE TABLE hotels (
    id SERIAL PRIMARY KEY,
    image VARCHAR(500) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Insert 12 dummy hotel records
-- (price uses nightPrice from the frontend mock data)

INSERT INTO hotels (image, title, description, latitude, longitude, price) VALUES
(
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    'The Grand Palace Hotel',
    'Experience luxury at The Grand Palace Hotel, located in the heart of the city. Offering spacious rooms with stunning skyline views, a rooftop infinity pool, and world-class dining. Perfect for business travelers and vacationers seeking premium comfort and convenience.',
    28.613900, 77.209000, 250.00
),
(
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
    'Seaside Resort & Spa',
    'Nestled along the pristine coastline, Seaside Resort & Spa offers a tranquil escape with private beach access, full-service spa treatments, and ocean-view suites. Enjoy fresh seafood at our beachfront restaurant and unwind with sunset yoga sessions.',
    15.490900, 73.827800, 380.00
),
(
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop',
    'Mountain View Lodge',
    'Surrounded by towering peaks and lush pine forests, Mountain View Lodge is a haven for nature lovers. Cozy wood-paneled rooms, a crackling fireplace lounge, and guided trekking tours make this the ideal mountain getaway for families and adventurers.',
    34.083700, 74.797300, 150.00
),
(
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
    'Urban Boutique Hotel',
    'A stylish boutique hotel in the downtown arts district. Each room features curated local artwork, designer furnishings, and smart home amenities. Walking distance to galleries, theaters, cafes, and the city''s best nightlife.',
    19.076000, 72.877700, 180.00
),
(
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop',
    'Lakeside Heritage Inn',
    'A beautifully restored heritage property overlooking a serene lake. Lakeside Heritage Inn blends old-world charm with modern amenities. Enjoy boating, fishing, or simply relax on the veranda with a cup of local tea and breathtaking views.',
    24.585400, 72.712500, 120.00
),
(
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
    'Tropical Paradise Resort',
    'Escape to paradise with overwater bungalows, crystal-clear lagoons, and white sandy beaches. Tropical Paradise Resort offers snorkeling, diving excursions, and authentic island cuisine. An unforgettable destination for honeymooners and beach enthusiasts.',
    9.931200, 76.267300, 450.00
),
(
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&h=400&fit=crop',
    'City Central Business Hotel',
    'Conveniently located near the financial district, City Central Business Hotel caters to corporate travelers with fully equipped meeting rooms, high-speed internet, complimentary airport shuttle, and a 24-hour business center.',
    12.971600, 77.594600, 140.00
),
(
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop',
    'Desert Oasis Resort',
    'Experience the magic of the desert at this stunning resort featuring luxurious tented suites, camel safari excursions, traditional folk performances, and stargazing sessions under the vast open sky. A unique cultural retreat.',
    26.912400, 70.901600, 280.00
),
(
    'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=600&h=400&fit=crop',
    'Riverside Country Hotel',
    'Set along a gentle river in the countryside, this charming hotel offers farm-to-table dining, kayaking, cycling trails, and peaceful gardens. Riverside Country Hotel is perfect for a relaxing weekend away from the hustle of city life.',
    11.016800, 76.955800, 95.00
),
(
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&h=400&fit=crop',
    'Skyline Penthouse Suites',
    'Luxury redefined at Skyline Penthouse Suites. Located on the top floors of a landmark skyscraper, each suite offers panoramic city views, a private jacuzzi, personal butler service, and access to an exclusive rooftop lounge and helipad.',
    28.630400, 77.217700, 600.00
),
(
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&h=400&fit=crop',
    'Hillside Vineyard Retreat',
    'Surrounded by rolling vineyards, this charming retreat offers wine-tasting tours, gourmet farm cuisine, and cozy cottage-style rooms with vineyard views. Ideal for couples and food enthusiasts looking for a relaxing countryside escape.',
    18.520400, 73.856700, 210.00
),
(
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop',
    'Coral Bay Beach Hotel',
    'A family-friendly beachfront hotel with spacious rooms, kids'' club, water sports center, and multiple dining options. Coral Bay Beach Hotel is the perfect destination for a fun-filled tropical family vacation with something for everyone.',
    8.088300, 77.538500, 195.00
);
