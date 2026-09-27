import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:5000";

function mapHotel(raw) {
  const p = parseFloat(raw.price);
  return {
    ...raw,
    id: Number(raw.id),
    price: p,
    nightPrice: p,
    dayPrice: Math.round(p * 0.7),
    latitude: parseFloat(raw.latitude),
    longitude: parseFloat(raw.longitude),
  };
}

// ─────────────────────────────────────────────
// Async Thunk: GET /api/hotels
// ─────────────────────────────────────────────
export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { search = "", minPrice = "", maxPrice = "", offset = 0, limit = 6 } = params;
      const query = new URLSearchParams();
      if (search) query.set("search", search);
      if (minPrice !== "") query.set("minPrice", minPrice);
      if (maxPrice !== "") query.set("maxPrice", maxPrice);
      query.set("offset", offset);
      query.set("limit", limit);

      const res = await fetch(`${API_BASE}/api/hotels?${query.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch hotels");
      const data = await res.json();
      return {
        hotels: data.hotels.map(mapHotel),
        total: data.total,
        offset: data.offset,
        limit: data.limit,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─────────────────────────────────────────────
// Async Thunk: POST /api/hotels
// ─────────────────────────────────────────────
export const createHotel = createAsyncThunk(
  "hotels/createHotel",
  async (hotelData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (hotelData.imageFile) {
        formData.append("image", hotelData.imageFile);
      }
      formData.append("title", hotelData.title);
      formData.append("description", hotelData.description);
      formData.append("latitude", hotelData.latitude);
      formData.append("longitude", hotelData.longitude);
      formData.append("price", hotelData.price);

      const res = await fetch(`${API_BASE}/api/hotels`, {
        method: "POST",
        body: formData, // browser sets Content-Type with boundary automatically
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create hotel");
      }
      const data = await res.json();
      return mapHotel(data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─────────────────────────────────────────────
// Async Thunk: PUT /api/hotels/:id
// ─────────────────────────────────────────────
export const updateHotel = createAsyncThunk(
  "hotels/updateHotel",
  async (hotelData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (hotelData.imageFile) {
        formData.append("image", hotelData.imageFile);
      }
      formData.append("title", hotelData.title);
      formData.append("description", hotelData.description);
      formData.append("latitude", hotelData.latitude);
      formData.append("longitude", hotelData.longitude);
      formData.append("price", hotelData.price);

      const res = await fetch(`${API_BASE}/api/hotels/${hotelData.id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update hotel");
      }
      const data = await res.json();
      return mapHotel(data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─────────────────────────────────────────────
// Async Thunk: DELETE /api/hotels/:id
// ─────────────────────────────────────────────
export const deleteHotel = createAsyncThunk(
  "hotels/deleteHotel",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/hotels/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete hotel");
      }
      return id; // return the deleted id so the reducer can remove it
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─────────────────────────────────────────────
// Initial State
// ─────────────────────────────────────────────
const initialState = {
  hotels: [],
  total: 0,
  searchTerm: "",
  minPrice: "",
  maxPrice: "",
  priceMode: "night",
  loading: false,
  error: null,
};

// ─────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────
const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setPriceMode: (state, action) => {
      state.priceMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ── fetchHotels ──────────────────────────
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload.hotels;
        state.total = action.payload.total;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── createHotel ──────────────────────────
    builder
      .addCase(createHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHotel.fulfilled, (state) => {
        state.loading = false;
        // The list will be re-fetched by the page after creation
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── updateHotel ──────────────────────────
    builder
      .addCase(updateHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.hotels.findIndex((h) => h.id === action.payload.id);
        if (index !== -1) {
          state.hotels[index] = action.payload;
        }
      })
      .addCase(updateHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── deleteHotel ──────────────────────────
    builder
      .addCase(deleteHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = state.hotels.filter((h) => h.id !== action.payload);
        if (state.total > 0) state.total -= 1;
      })
      .addCase(deleteHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, setMinPrice, setMaxPrice, setPriceMode } =
  hotelSlice.actions;

export default hotelSlice.reducer;
