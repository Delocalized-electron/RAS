import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"; // Import the auth slice reducer
import itemsReducer from "./items";

const store = configureStore({
  reducer: {
    auth: authReducer, // Register your reducers here
    items: itemsReducer,
  },
});

export default store;
