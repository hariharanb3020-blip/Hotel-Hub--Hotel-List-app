import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotelSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    hotels: hotelReducer,
    notification: notificationReducer,
  },
});

export default store;
