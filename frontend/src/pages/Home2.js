import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { MdOutlineInventory2 } from "react-icons/md";
import { PiPlus } from "react-icons/pi";
import { IoIosTrendingDown } from "react-icons/io";
import { IoSearchOutline, IoSettingsOutline } from "react-icons/io5";
import StockDisplay from "../components/StockDisplay";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../store/items";
import Loading from "./Loading";
import InventoryDisplay from "../components/InventoryDisplay";
import RAS_logo from "../assets/ras_logo.svg";
import LowStockHome from "../components/LowStockHome";

const Home2 = () => {
  const [tabIndex, setTabIndex] = useState(0); // State for active tab
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  const lowStockItems = items.filter((item) => item.itemQuantity < 5);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen font-montserrat fixed inset-0">
      {/* Header */}
      <div className="flex p-4 justify-between items-center text-3xl">
        <img src={RAS_logo} alt="RAS" className="h-16" />
        <IoSettingsOutline />
      </div>
      {/* Search Bar */}

      <button className=" bg-[#EAEEEE] rounded-lg m-4">
        <p className="flex text-xl items-center p-4 gap-2">
          <IoSearchOutline className="text-2xl text-gray-500" /> Search...
        </p>
      </button>
      <LowStockHome lowStockItems={lowStockItems} />
      {/* Tabs
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

      
      <div className="flex-grow overflow-hidden">
        <SwipeableViews index={tabIndex} onChangeIndex={handleTabChange}>
          
          <div className="h-full overflow-y-auto p-4">
            {status === "idle" && <Loading />}
            {status === "loading" && <Loading />}
            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" && lowStockItems.length > 0 && (
              <ul className="grid grid-cols-1 gap-4">
                {lowStockItems.map((item) => (
                  <StockDisplay
                    itemId={item._id}
                    key={item._id}
                    itemName={item.itemName}
                    itemQuantity={item.itemQuantity}
                  />
                ))}
              </ul>
            )}
            {status === "succeeded" && lowStockItems.length === 0 && (
              <p>No items are low on stock</p>
            )}
          </div>

          
          <div className="flex-grow overflow-y-auto overflow-hidden p-4">
            <InventoryDisplay
              items={items}
              status={status}
              error={error}
              isInventory="True"
            />
          </div>
        </SwipeableViews>
      </div> */}
      {/* Add New Item Button */}
      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 flex items-center justify-center">
        <button
          className="py-4 gap-2 w-full max-w-screen-md flex flex-row text-white rounded-full text-xl justify-center bg-[#3212E8] hover:bg-gray-700 transition-colors duration-300"
          style={{ backgroundColor: "#0D4EA0" }}
        >
          <PiPlus className="text-2xl" />
          <p className="m-0 p-0">Add New Item</p>
        </button>
      </div>
    </div>
  );
};

export default Home2;
