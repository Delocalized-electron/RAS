import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";

const AddItems = () => {
  return (
    <div className="flex p-4 flex-col font-montserrat justify-between gap-4">
      <Link to="/">
        <p className="flex mb-4 flex-row items-center text-xl">
          <MdOutlineArrowBackIos />
          Add Items
        </p>
      </Link>
    </div>
  );
};

export default AddItems;
