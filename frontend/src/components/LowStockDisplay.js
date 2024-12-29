import React from "react";

const LowStockDisplay = (props) => {
  console.log(props);
  const { itemName, itemQuantity, itemId } = props;
  return (
    <li key={itemId}>
      <div className="flex gap-2 flex-col justify-between p-4 bg-white rounded-lg border-1 border-[#EAEEEE] shadow-sm">
        <p className=" text-xl">{itemName}</p>
        <p className="rounded-full w-fit text-sm px-2 bg-[#FCEBEC] text-[#9E2930]">
          {itemQuantity} {itemQuantity <= 1 ? "item" : "items"} left
        </p>
      </div>
    </li>
  );
};

export default LowStockDisplay;
