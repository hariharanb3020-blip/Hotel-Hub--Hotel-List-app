const mockHotels = [
  {
    id: 1,
    title: "The Grand Palace Hotel",
    description:
      "Experience luxury at The Grand Palace Hotel, located in the heart of the city. Offering spacious rooms with stunning skyline views, a rooftop infinity pool, and world-class dining. Perfect for business travelers and vacationers seeking premium comfort and convenience.",
    dayPrice: 180,
    nightPrice: 250,
    latitude: 28.6139,
    longitude: 77.209,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Seaside Resort & Spa",
    description:
      "Nestled along the pristine coastline, Seaside Resort & Spa offers a tranquil escape with private beach access, full-service spa treatments, and ocean-view suites. Enjoy fresh seafood at our beachfront restaurant and unwind with sunset yoga sessions.",
    dayPrice: 280,
    nightPrice: 380,
    latitude: 15.4909,
    longitude: 73.8278,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Mountain View Lodge",
    description:
      "Surrounded by towering peaks and lush pine forests, Mountain View Lodge is a haven for nature lovers. Cozy wood-paneled rooms, a crackling fireplace lounge, and guided trekking tours make this the ideal mountain getaway for families and adventurers.",
    dayPrice: 100,
    nightPrice: 150,
    latitude: 34.0837,
    longitude: 74.7973,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Urban Boutique Hotel",
    description:
      "A stylish boutique hotel in the downtown arts district. Each room features curated local artwork, designer furnishings, and smart home amenities. Walking distance to galleries, theaters, cafes, and the city's best nightlife.",
    dayPrice: 120,
    nightPrice: 180,
    latitude: 19.076,
    longitude: 72.8777,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Lakeside Heritage Inn",
    description:
      "A beautifully restored heritage property overlooking a serene lake. Lakeside Heritage Inn blends old-world charm with modern amenities. Enjoy boating, fishing, or simply relax on the veranda with a cup of local tea and breathtaking views.",
    dayPrice: 80,
    nightPrice: 120,
    latitude: 24.5854,
    longitude: 72.7125,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Tropical Paradise Resort",
    description:
      "Escape to paradise with overwater bungalows, crystal-clear lagoons, and white sandy beaches. Tropical Paradise Resort offers snorkeling, diving excursions, and authentic island cuisine. An unforgettable destination for honeymooners and beach enthusiasts.",
    dayPrice: 320,
    nightPrice: 450,
    latitude: 9.9312,
    longitude: 76.2673,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    title: "City Central Business Hotel",
    description:
      "Conveniently located near the financial district, City Central Business Hotel caters to corporate travelers with fully equipped meeting rooms, high-speed internet, complimentary airport shuttle, and a 24-hour business center.",
    dayPrice: 90,
    nightPrice: 140,
    latitude: 12.9716,
    longitude: 77.5946,
    image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Desert Oasis Resort",
    description:
      "Experience the magic of the desert at this stunning resort featuring luxurious tented suites, camel safari excursions, traditional folk performances, and stargazing sessions under the vast open sky. A unique cultural retreat.",
    dayPrice: 200,
    nightPrice: 280,
    latitude: 26.9124,
    longitude: 70.9016,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop",
  },
  {
    id: 9,
    title: "Riverside Country Hotel",
    description:
      "Set along a gentle river in the countryside, this charming hotel offers farm-to-table dining, kayaking, cycling trails, and peaceful gardens. Riverside Country Hotel is perfect for a relaxing weekend away from the hustle of city life.",
    dayPrice: 65,
    nightPrice: 95,
    latitude: 11.0168,
    longitude: 76.9558,
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=600&h=400&fit=crop",
  },
  {
    id: 10,
    title: "Skyline Penthouse Suites",
    description:
      "Luxury redefined at Skyline Penthouse Suites. Located on the top floors of a landmark skyscraper, each suite offers panoramic city views, a private jacuzzi, personal butler service, and access to an exclusive rooftop lounge and helipad.",
    dayPrice: 420,
    nightPrice: 600,
    latitude: 28.6304,
    longitude: 77.2177,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&h=400&fit=crop",
  },
  {
    id: 11,
    title: "Hillside Vineyard Retreat",
    description:
      "Surrounded by rolling vineyards, this charming retreat offers wine-tasting tours, gourmet farm cuisine, and cozy cottage-style rooms with vineyard views. Ideal for couples and food enthusiasts looking for a relaxing countryside escape.",
    dayPrice: 150,
    nightPrice: 210,
    latitude: 18.5204,
    longitude: 73.8567,
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&h=400&fit=crop",
  },
  {
    id: 12,
    title: "Coral Bay Beach Hotel",
    description:
      "A family-friendly beachfront hotel with spacious rooms, kids' club, water sports center, and multiple dining options. Coral Bay Beach Hotel is the perfect destination for a fun-filled tropical family vacation with something for everyone.",
    dayPrice: 140,
    nightPrice: 195,
    latitude: 8.0883,
    longitude: 77.5385,
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop",
  },
];

export default mockHotels;
