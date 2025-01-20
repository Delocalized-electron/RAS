import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchItems = () => {
  return (
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
  );
};

export default SearchItems;
