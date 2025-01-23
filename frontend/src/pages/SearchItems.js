import React, { useRef, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useSelector } from "react-redux";

const SearchItems = () => {
  const searchInputRef = useRef(null);
  const { items, status, error } = useSelector((state) => state.items);

  useEffect(() => {
    // Automatically focus the input when component mounts
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex p-4 flex-col font-montserrat justify-between gap-4">
      <Link to="/">
        <p className="flex mb-4 flex-row items-center text-xl">
          <MdOutlineArrowBackIos />
          Search
        </p>
      </Link>
      <div className="relative w-full">
        <IoSearchOutline className="absolute text-2xl m-4 left-1 top-2 transform -translate-y-1/2 text-gray-500" />
        <input
          ref={searchInputRef}
          className="w-full bg-[#EAEEEE] rounded-lg p-3 pl-14"
          type="text"
          placeholder="Search..."
        />
      </div>
      <div>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border-1 border-[#EAEEEE] shadow-sm"
            >
              <div className="flex gap-2 flex-col justify-between">
                <p className="text-xl">{item.itemName}</p>
                <p className="text-lg">₹ {item.itemPrice}</p>
                <p
                  className={`rounded-full w-fit text-sm px-2 ${
                    item.itemQuantity > 10
                      ? "bg-[#E6F4EA] text-[#2E7D32]"
                      : item.itemQuantity >= 5 && item.itemQuantity <= 10
                      ? "bg-[#FFF4E5] text-[#F57C00]"
                      : "bg-[#FCEBEC] text-[#9E2930]"
                  }`}
                >
                  {item.itemQuantity}{" "}
                  {item.itemQuantity <= 1 ? "item" : "items"} left
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchItems;
