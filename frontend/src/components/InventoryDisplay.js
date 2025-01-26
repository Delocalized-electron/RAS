import React from "react";
import Loading from "../pages/Loading";
import StockDisplay from "./StockDisplay";

const InventoryDisplay = (props) => {
  const items = props.items;
  const status = props.status;
  const error = props.error;
  const isInventory = props.isInventory;
  return (
    <div>
      {/* Added a wrapping div */}
      {status === "idle" && <Loading />}
      {status === "loading" && <Loading />}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && items.length > 0 && (
        <div>
          <ul className="grid grid-cols-1 gap-4">
            {items.map((item) => (
              <StockDisplay
                itemId={item._id}
                key={item._id}
                itemName={item.itemName}
                itemPrice={item.itemPrice}
                itemQuantity={item.itemQuantity}
                isInventory={isInventory}
              />
            ))}
          </ul>
        </div>
      )}
      {status === "succeeded" && items.length === 0 && (
        <div className="p-4">
          <p>No items are low on stock</p>
        </div>
      )}
    </div>
  );
};

export default InventoryDisplay;
