import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { MdOutlineInventory2 } from "react-icons/md";

import { PiPlus } from "react-icons/pi";
import { IoIosTrendingDown } from "react-icons/io";
import { IoSearchOutline, IoSettingsOutline } from "react-icons/io5";
import LowStockDisplay from "../components/LowStockDisplay";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../store/items";
import Loading from "./Loading";

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0); // State for active tab
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);
  console.log(items, status, error);
  const lowStockItems = items.filter((item) => item.itemQuantity < 5);
  console.log(lowStockItems);

  // const olderLowStockItems = [
  //   { itemName: "Brake Disc Caliper", itemQuantity: 1 },
  //   { itemName: "Carburetor", itemQuantity: 3 },
  //   { itemName: "Spark Plug", itemQuantity: 4 },
  //   { itemName: "Air Filter", itemQuantity: 4 },
  // ];

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <div className="flex gap-3 flex-col bg-gray-50 min-h-screen font-montserrat fixed inset-0">
      {/* Header */}
      <div className="flex p-4 justify-between text-3xl">
        <h3>My Garage</h3>
        <IoSettingsOutline />
      </div>

      {/* Search Bar */}
      <div className="flex p-4 mb-4 justify-between h-10">
        <div className="relative w-full">
          <IoSearchOutline className="absolute text-2xl m-4 left-1 top-2 transform -translate-y-1/2 text-gray-500" />
          <input
            className="w-full bg-[#EAEEEE] rounded-lg p-3 pl-14"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b-2 border-[#EAEEEE] gap-4 mt-4">
        <button
          className={`px-4 py-2 flex gap-2 ${
            tabIndex === 0 ? "border-b-2 border-black" : ""
          }`}
          onClick={() => handleTabChange(0)}
        >
          <IoIosTrendingDown className="text-xl" /> Low on Stock
        </button>
        <button
          className={`px-4 py-2 flex gap-2 ${
            tabIndex === 1 ? "border-b-2 border-black" : ""
          }`}
          onClick={() => handleTabChange(1)}
        >
          <MdOutlineInventory2 className="text-xl" /> My Inventory
        </button>
      </div>

      {/* Swipeable Content */}
      <div className="flex-grow overflow-scroll">
        <SwipeableViews index={tabIndex} onChangeIndex={handleTabChange}>
          {/* Tab 1: Low on Stock */}
          <div>
            {" "}
            {/* Added a wrapping div */}
            {status === "idle" && <Loading />}
            {status === "loading" && <Loading />}
            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" && lowStockItems.length > 0 && (
              <div className="p-4">
                <ul className="grid grid-cols-1 gap-4">
                  {lowStockItems.map((item) => (
                    <LowStockDisplay
                      itemId={item._id}
                      key={item._id}
                      itemName={item.itemName}
                      itemQuantity={item.itemQuantity}
                    />
                  ))}
                </ul>
              </div>
            )}
            {status === "succeeded" && lowStockItems.length === 0 && (
              <div className="p-4">
                <p>No items are low on stock</p>
              </div>
            )}
          </div>

          {/* Tab 2: My Inventory */}
          <div className="p-4 overflow-y-auto h-full">
            <p>Your inventory items will appear here.</p>
            <ul>
              <li>Inventory Item 1</li>
              <li>Inventory Item 2</li>
            </ul>
          </div>
        </SwipeableViews>
      </div>

      {/* Add New Item Button */}
      <div className="fixed bottom-0 bg-white left-0 right-0 px-6 items-center flex justify-center">
        <button
          className="py-4 my-4 gap-2 w-full max-w-screen-md flex flex-row text-white rounded-full text-xl justify-center bg-[#3212E8] hover:bg-gray-700 transition-colors duration-300"
          style={{ backgroundColor: "#3212E8" }}
        >
          <PiPlus className="text-2xl" />
          <p className="m-0 p-0">Add New Item</p>
        </button>
      </div>
    </div>
  );
};

export default Home;
