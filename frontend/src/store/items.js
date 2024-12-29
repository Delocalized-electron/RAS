import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const intialItemsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/stocks`);
  return response.data.data;
});

const itemsSlice = createSlice({
  name: "items",
  initialState: intialItemsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const itemsActions = itemsSlice.actions;
export default itemsSlice.reducer;
