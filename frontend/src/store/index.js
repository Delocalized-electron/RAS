import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"; // Import the auth slice reducer

const store = configureStore({
  reducer: {
    auth: authReducer, // Register your reducers here
  },
});

export default store;
