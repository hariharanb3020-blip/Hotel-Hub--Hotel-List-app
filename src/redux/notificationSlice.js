import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "success", // "success" or "error"
  visible: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || "success";
      state.visible = true;
    },
    hideNotification: (state) => {
      state.visible = false;
      state.message = "";
    },
  },
});

export const { showNotification, hideNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
