import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    itemQuantity: {
      type: Number,
      required: true,
      min: [0, "Minimum quantity cannot be less than 0"],
    },
    itemPrice: {
      type: Number,
    },
    isLowOnStock: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Stock = mongoose.model("Stock", stockSchema);
