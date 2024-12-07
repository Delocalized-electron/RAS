import { Stock } from "../models/stock.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add items to DB
const addItems = asyncHandler(async (req, res) => {
  /**
   * check if input is not empty
   * check if item already exists
   *    -if already exists
   *        -update quantity (if price is same)
   *        -if price is different( add new entry with same name)
   * add item
   */

  const { itemName, itemQuantity, itemPrice } = req.body;
  // check if input is not empty

  if (!itemName || !itemQuantity || !itemPrice) {
    throw new ApiError(400, "All fields are necessary");
  }
  if (isNaN(itemQuantity) || isNaN(itemPrice)) {
    throw new ApiError(400, "Quantity and price must be numbers");
  }

  //check if item price/item quantity is not less than 1
  if ([itemPrice, itemQuantity].some((num) => num < 1)) {
    throw new ApiError(400, "item price/item quantity cannot be less than 1");
  }

  //check if item is already present in the db
  const existedItem = await Stock.findOne({
    itemName,
    itemPrice,
  });

  if (existedItem) {
    const item = await Stock.findByIdAndUpdate(
      existedItem._id,
      {
        $set: {
          itemQuantity: existedItem.itemQuantity + parseInt(itemQuantity),
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, item, "Item added successfully"));
  }
  const item = await Stock.create({
    itemName,
    itemPrice,
    itemQuantity,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, item, "Item added successfully"));
});

const removeItems = asyncHandler(async (req, res) => {
  /**
   * get the itemname and price
   * check if item exists in DB
   *
   *
   */
  try {
    const { itemName, itemPrice } = req.body;
    // check if input is not empty

    if (!itemName || !itemPrice) {
      throw new ApiError(400, "All fields are necessary");
    }

    const item = await Stock.findOneAndDelete({
      itemName,
      itemPrice,
    });
    console.log(item);

    if (!item) {
      throw new ApiError(404, "Item not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "item deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Internal server error");
  }
});

export { addItems, removeItems };
