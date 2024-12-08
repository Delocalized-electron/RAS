import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    itemQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Minimum quantity cannot be less than 0"],
    },
    itemPrice: {
      type: Number,
      default: 0,
    },
    isLowOnStock: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Stock = mongoose.model("Stock", stockSchema);
