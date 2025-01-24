import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const MiniStockDisplay = (props) => {
  const { itemName, itemPrice, itemQuantity, itemId } = props;
  let quantityClass =
    "rounded-full w-fit text-xs px-2 bg-[#FCEBEC] text-[#9E2930]"; // Default red for <5

  if (itemQuantity > 10) {
    quantityClass =
      "rounded-full w-fit text-xs px-2 bg-[#E6F4EA] text-[#2E7D32]"; // Green for >10
  } else if (itemQuantity >= 5 && itemQuantity <= 10) {
    quantityClass =
      "rounded-full w-fit text-xs px-2 bg-[#FFF4E5] text-[#F57C00]"; // Yellow for 5-10
  }
  return (
    <li key={itemId} className="list-none flex-shrink-0">
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border-1 border-[#EAEEEE] shadow-sm ">
        <div className="flex gap-2 flex-col justify-between">
          <p className="text-md">{itemName}</p>
          <p className="text-sm">₹ {itemPrice}</p>
          <p className={quantityClass}>
            {itemQuantity} {itemQuantity <= 1 ? "item" : "items"} left
          </p>
        </div>
      </div>
    </li>
  );
};

const LowStockHome = (props) => {
  const { lowStockItems } = props;

  return (
    <div className="flex flex-col p-4 pt-2 justify-between gap-4">
      <p className="text-xl align-middle font-medium flex flex-row items-center gap-2">
        Low on Stock <MdOutlineArrowForwardIos />
      </p>
      {/* Horizontal Scrollable Container */}
      <ul className="flex overflow-x-auto gap-4">
        {lowStockItems.map((item) => (
          <MiniStockDisplay
            itemId={item._id}
            key={item._id}
            itemName={item.itemName}
            itemPrice={item.itemPrice}
            itemQuantity={item.itemQuantity}
          />
        ))}
      </ul>
    </div>
  );
};

export default LowStockHome;
