import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { addItem, fetchItems } from "../store/items";

const AddItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState({
    itemName: "",
    itemPrice: "",
    itemQuantity: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityChange = (action) => {
    setItemDetails((prev) => ({
      ...prev,
      itemQuantity:
        action === "increase"
          ? prev.itemQuantity + 1
          : Math.max(0, prev.itemQuantity - 1),
    }));
  };

  const handleSave = () => {
    dispatch(addItem(itemDetails))
      .unwrap()
      .then(() => {
        dispatch(fetchItems()); // Refetch items after adding
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to add item", error);
      });
  };
  return (
    <div className="flex p-4 flex-col h-screen font-montserrat justify-between gap-4">
      <Link to="/">
        <p className="flex mb-4 flex-row items-center text-xl">
          <MdOutlineArrowBackIos />
          Add Items
        </p>
      </Link>
      <div className="relative w-full flex gap-4 flex-col mt-4 justify-between h-full text-[#616464] flex-grow">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label className="text-md">Item Name</label>
            <input
              name="itemName"
              value={itemDetails.itemName}
              onChange={handleInputChange}
              className="w-full text-sm border-[#BFC6C6] border rounded-lg p-4"
              type="text"
              placeholder="Item Name"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-md">Item Price</label>
            <input
              name="itemPrice"
              value={itemDetails.itemPrice}
              onChange={handleInputChange}
              className="w-full text-sm border-[#BFC6C6] border rounded-lg p-4"
              type="number"
              placeholder="Item Price"
            />
          </div>
        </div>
        <div className="flex items-center flex-col gap-4">
          <p className="text-lg">Total number of items</p>
          <div className="border-[#BFC6C6] border rounded-lg flex items-center">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="p-4 text-4xl text-red-400"
            >
              -
            </button>
            <input
              type="number"
              name="itemQuantity"
              value={itemDetails.itemQuantity}
              onChange={handleInputChange}
              className="p-4 text-2xl font-medium w-20 text-center"
              min="0"
            />
            <button
              onClick={() => handleQuantityChange("increase")}
              className="p-4 text-4xl text-green-400"
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="w-full mt-4 bg-[#0D4EA0] text-white p-4 rounded-full hover:bg-gray-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddItems;
