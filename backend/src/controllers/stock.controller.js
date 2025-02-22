import { Stock } from "../models/stock.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//Support functions
const updateOrDeleteItem = async (itemName, itemPrice, newQuantity) => {
  const item = await Stock.findOne({ itemName, itemPrice });
  console.log("newQuantity", newQuantity);
  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  if (newQuantity === 0) {
    const { deletedCount } = await item.deleteOne();
    return { isDeleted: deletedCount === 1, updatedItem: null }; // No updated item if deleted
  } else {
    item.itemQuantity = parseInt(newQuantity);
    const updatedItem = await item.save();
    return { isDeleted: false, updatedItem };
  }
};

const changeQuantityByOne = async (
  req,
  res,
  quantityChange,
  successMessage
) => {
  const { itemName, itemPrice } = req.body;

  if (!itemName || !itemPrice) {
    throw new ApiError(400, "All fields are necessary");
  }

  const item = await Stock.findOne({ itemName, itemPrice });

  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  const newQuantity = item.itemQuantity + quantityChange;

  const { isDeleted, updatedItem } = await updateOrDeleteItem(
    itemName,
    itemPrice,
    newQuantity
  );

  if (isDeleted) {
    return res.status(200).json(new ApiResponse(200, {}, "Item deleted"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedItem, successMessage));
};

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
    console.log("existedItem", existedItem);
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

const decreaseQuantityByOne = asyncHandler(async (req, res) => {
  await changeQuantityByOne(req, res, -1, "Quantity decreased by one");
});

const increaseQuantityByOne = asyncHandler(async (req, res) => {
  await changeQuantityByOne(req, res, 1, "Quantity increased by one");
});

const updateItemDetails = asyncHandler(async (req, res) => {
  const { itemId, itemName, itemPrice, itemQuantity } = req.body;

  // Validate required fields
  if (!itemId) {
    throw new ApiError(400, "Item ID is required for updating details");
  }

  // Validate that at least one field to update is provided
  if (!itemName && !itemPrice && !itemQuantity) {
    throw new ApiError(400, "At least one field to update must be provided");
  }

  // Ensure price and quantity, if provided, are valid numbers
  if (itemPrice !== undefined && (isNaN(itemPrice) || itemPrice <= 0)) {
    throw new ApiError(400, "Item price must be a positive number");
  }

  if (itemQuantity !== undefined && (isNaN(itemQuantity) || itemQuantity < 0)) {
    throw new ApiError(400, "Item quantity must be a non-negative number");
  }

  // Find the item by ID
  const item = await Stock.findById(itemId);

  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  // Update fields if they are provided
  if (itemName) item.itemName = itemName;
  if (itemPrice) item.itemPrice = itemPrice;
  if (itemQuantity) item.itemQuantity = itemQuantity;

  // Save updated item to the database
  const updatedItem = await item.save();

  // Return the updated item
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedItem, "Item details updated successfully")
    );
});

const getAllItems = asyncHandler(async (req, res) => {
  try {
    const items = await Stock.find().sort({ createdAt: -1 }); // Fetch all items from the database

    if (!items || items.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, [], "No items found in database")); // Return empty array if no items
    }

    return res
      .status(200)
      .json(new ApiResponse(200, items, "Items fetched successfully"));
  } catch (error) {
    console.error("Error fetching all items:", error);
    throw new ApiError(500, error.message || "Internal server error");
  }
});

export {
  addItems,
  removeItems,
  decreaseQuantityByOne,
  increaseQuantityByOne,
  updateItemDetails,
  getAllItems,
};
