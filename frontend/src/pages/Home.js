import React, { useEffect } from "react";
import { PiPlus } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../store/items";
import InventoryDisplay from "../components/InventoryDisplay";
import RAS_logo from "../assets/ras_logo.svg";
import LowStockHome from "../components/LowStockHome";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((state) => state.items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  // Supporting functions
  const handleLogout = () => {
    dispatch(authActions.logout());
    console.log("Navigating to:", "/login");
    navigate("/login", { replace: true });
  };
  const handleSearch = () => {
    navigate("/search");
  };

  const lowStockItems = items.filter((item) => item.itemQuantity < 5);

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen font-montserrat fixed inset-0 overflow-y-auto">
      {/* Header */}
      <div className="flex p-4 pb-2 justify-between items-center text-3xl">
        <img src={RAS_logo} alt="RAS" className="h-16" />
        <FiLogOut className="text-2xl" onClick={handleLogout} />
      </div>
      {/* Search Bar */}

      <button
        onClick={handleSearch}
        className=" bg-[#EAEEEE] text-[#616464] rounded-lg mt-0 m-4"
      >
        <p className="flex text-xl items-center p-3 gap-2">
          <IoSearchOutline className="text-2xl text-gray-500" /> Search...
        </p>
      </button>
      <LowStockHome lowStockItems={lowStockItems} />
      <p className="text-xl font-medium ml-4 mt-2">My Inventory</p>
      <div className="flex-grow gap-4  p-4 pb-24">
        <InventoryDisplay
          items={items}
          status={status}
          error={error}
          isInventory="True"
        />
      </div>

      {/* Add New Item Button */}
      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 flex items-center justify-center">
        <button
          className="py-4 gap-2 w-full max-w-screen-md flex flex-row text-white rounded-full text-xl justify-center bg-[#3212E8] hover:bg-gray-700 transition-colors duration-300"
          style={{ backgroundColor: "#0D4EA0" }}
          onClick={() => {
            navigate("/addItems");
          }}
        >
          <PiPlus className="text-2xl" />
          <p className="m-0 p-0">Add New Item</p>
        </button>
      </div>
    </div>
  );
};

export default Home;
