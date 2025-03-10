import React from "react";
import { GoPencil } from "react-icons/go";
import { Link } from "react-router-dom";

const StockDisplay = (props) => {
  const { itemName, itemPrice, itemQuantity, itemId } = props;
  const isInv = props.isInventory;
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
    <li key={itemId}>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border-1 border-[#EAEEEE] shadow-sm">
        <div className="flex gap-2 flex-col justify-between ">
          <p className=" text-md">{itemName}</p>
          <p className="text-sm">₹ {itemPrice}</p>
          <p className={quantityClass}>
            {itemQuantity} {itemQuantity <= 1 ? "item" : "items"} left
          </p>
        </div>
        {isInv && (
          <Link to={`/`}>
            {" "}
            <GoPencil className="text-2xl" />{" "}
          </Link>
        )}
      </div>
    </li>
  );
};

export default StockDisplay;
