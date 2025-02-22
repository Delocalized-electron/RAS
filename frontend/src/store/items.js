import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const intialItemsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/stocks`, {
    params: {
      sort: "-createdAt",
    },
  });
  return response.data.data;
});

export const addItem = createAsyncThunk(
  "items/addItem",
  async (itemData, { rejectWithValue }) => {
    console.log("itemData", itemData);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/stocks/add-items`,
        itemData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
      })
      .addCase(addItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const itemsActions = itemsSlice.actions;
export default itemsSlice.reducer;
